import type { RevHeader } from "../messages/RevHeader";
import type { RevId } from "../messages/RevId";
import type { AbandonRevisions } from "../messages/AbandonRevisions";
import type { AbandonSubRevisions } from "../messages/AbandonSubRevisions";
import type { BackoutRevisions } from "../messages/BackoutRevisions";
import type { CheckoutRevision } from "../messages/CheckoutRevision";
import type { CopyChanges } from "../messages/CopyChanges";
import type { CreateRevision } from "../messages/CreateRevision";
import type { CreateRevisionBetween } from "../messages/CreateRevisionBetween";
import type { DescribeRevision } from "../messages/DescribeRevision";
import type { DuplicateRevisions } from "../messages/DuplicateRevisions";
import type { MoveChanges } from "../messages/MoveChanges";
import type { CreateRef } from "../messages/CreateRef";
import { getInput, mutate } from "../ipc";
import type { StoreRef } from "../messages/StoreRef";
import type { MoveRevisionsAfter } from "../messages/MoveRevisionsAfter"
import type { Resolve } from "../messages/Resolve"

let static_cutted_item: RevHeader[] = []
export default class RevisionMutator {
    #revision: RevHeader;

    constructor(rev: RevHeader) {
        this.#revision = rev;
    }

    // context-free mutations which can be triggered by a menu event
    handle(event: string | undefined) {
        if (!event) {
            return;
        }

        switch (event) {
            case "new_child":
                this.onNewChild();
                break;
            case "new_parent":
                this.onNewParent();
                break;
            case "edit":
                if (!this.#revision.is_immutable) {
                    this.onEdit();
                }
                break;
            case "backout":
                this.onBackout();
                break;
            case "duplicate":
                this.onDuplicate();
                break;
            case "abandon":
                if (!this.#revision.is_immutable) {
                    this.onAbandon();
                }
                break;
            case "abandon_sub_revisions":
                if (!this.#revision.is_immutable) {
                    console.log("abandon sub items")
                    this.onAbandonSub();
                }
                break;
            case "squash":
                if (!this.#revision.is_immutable && this.#revision.parent_ids.length == 1) {
                    this.onSquash();
                }
                break;
            case "restore":
                if (!this.#revision.is_immutable && this.#revision.parent_ids.length == 1) {
                    this.onRestore();
                }
                break;
            case "branch":
                this.onBranch();
                break;
            case "cut":
                this.onCut();
                break;
            case "paste_after":
                this.onPasteAfter()
                break;
            default:
                console.log(`unimplemented mutation '${event}'`, this);
        }
    }

    onNewChild = () => {
        mutate<CreateRevision>("create_revision", {
            parent_ids: [this.#revision.id],
        });
    };

    onNewParent = () => {
        mutate<CreateRevisionBetween>("create_revision_between", {
            before_id: this.#revision.id,
            after_id: this.#revision.parent_ids[0]
        });
    };

    onEdit = () => {
        if (this.#revision.is_working_copy) {
            return;
        }

        if (this.#revision.is_immutable) {
            mutate<CreateRevision>("create_revision", {
                parent_ids: [this.#revision.id],
            });
        } else {
            mutate<CheckoutRevision>("checkout_revision", {
                id: this.#revision.id,
            });
        }
    };

    onBackout = () => {
        mutate<BackoutRevisions>("backout_revisions", {
            ids: [this.#revision.id],
        });
    };

    onDuplicate = () => {
        mutate<DuplicateRevisions>("duplicate_revisions", {
            ids: [this.#revision.id],
        });
    };

    onAbandon = () => {
        mutate<AbandonRevisions>("abandon_revisions", {
            ids: [this.#revision.id.commit],
        });
    };

    onAbandonSub = () => {
        mutate<AbandonSubRevisions>("abandon_sub_revisions", {
            id: this.#revision.id,
        })
    };

    onDescribe = (new_description: string, reset_author: boolean) => {
        mutate<DescribeRevision>("describe_revision", {
            id: this.#revision.id,
            new_description,
            reset_author,
        });
    };

    onSquash = () => {
        mutate<MoveChanges>("move_changes", {
            from_id: this.#revision.id,
            to_id: this.#revision.parent_ids[0],
            paths: []
        });
    };

    onRestore = () => {
        mutate<CopyChanges>("copy_changes", {
            from_id: this.#revision.parent_ids[0],
            to_id: this.#revision.id,
            paths: []
        });
    };

    onBranch = async () => {
        let response = await getInput("Create Bookmark", "", ["Bookmark Name"]);
        if (response) {
            let ref: StoreRef = {
                type: "LocalBookmark",
                branch_name: response["Bookmark Name"],
                has_conflict: false,
                is_synced: false,
                potential_remotes: 0,
                available_remotes: 0,
                tracking_remotes: []
            };
            mutate<CreateRef>("create_ref", { ref, id: this.#revision.id })
        }
    }

    onCut = () => {
        static_cutted_item.push(this.#revision)
    }

    onPasteAfter = async () => {
        if (static_cutted_item != null && static_cutted_item.length > 0) {
            await mutate<MoveRevisionsAfter>("move_revisions_after", { ids_str: static_cutted_item.map(it => it.id.commit.hex).join(","), after_id: this.#revision.id })
        }
        static_cutted_item.splice(0, Infinity)
        window.location.reload();
    }

    onResolve = async () => {
        await mutate<Resolve>("resolve_revision", { id: this.#revision.id })
        window.location.reload();
    }

}
