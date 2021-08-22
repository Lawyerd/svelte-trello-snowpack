<script>
  import { tick, createEventDispatcher, onDestroy } from "svelte";
  import { lists } from "~/store/list";
  import { autoFocusout } from "~/actions/autoFocusout";
  export let list;
  let isEditMode = false;
  let title = list.title;
  let textareaEl;
  const dispatch = createEventDispatcher();

  function saveTitle() {
    if (title.trim()) {
      lists.edit({
        listId: list.id,
        title,
      });
    }
    offEditMode();
  }

  function removeList() {
    lists.remove({
      listId: list.id,
    });
    offEditMode();
  }

  async function onEditMode() {
    isEditMode = true;
    dispatch("editMode", true);
    title = list.title;
    await tick();
    textareaEl && textareaEl.focus();
  }
  function offEditMode() {
    isEditMode = false;
    dispatch("editMode", false);
  }

  onDestroy(() => {
    offEditMode();
  });
</script>

{#if isEditMode}
  <div class="edit-mode" use:autoFocusout={offEditMode}>
    <textarea
      bind:value={title}
      bind:this={textareaEl}
      placeholder="Enter a title for this list..."
      on:keydown={event => {
        event.key === "Enter" && saveTitle();
        event.key === "Escape" && offEditMode();
        event.key === "Esc" && offEditMode();
      }}
    />
    <div class="actions">
      <div class="btn success" on:click={saveTitle}>Save</div>
      <div class="btn" on:click={offEditMode}>Cancel</div>
      <div class="btn danger" on:click={removeList}>Delete</div>
    </div>
  </div>
{:else}
  <h2 class="title">
    {title}
    <div class="btn small edit-btn-for-list" on:click={onEditMode}>Edit</div>
  </h2>
{/if}

<style lang="scss">
  h2.title {
    // display: flex;
    // justify-content: space-between;
    font-weight: 700;
    padding: 4px 8px;
    cursor: pointer;
    position: relative; // 자식의 position을 맞추기 위해 position을 잡아야한다.

    .btn {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
    }
  }
  :global(.list__inner:hover .edit-btn-for-list) {
    display: block !important;
  }
  .actions {
    margin-bottom: 10px;
  }
</style>
