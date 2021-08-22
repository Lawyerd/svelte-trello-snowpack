<script>
  import Card from "~/components/Card.svelte";
  import CreateCard from "~/components/CreateCard.svelte";
  import ListTitle from "~/components/ListTitle.svelte";
  import { onMount } from "svelte";
  import Sortable from "sortablejs";
  import { cards } from "~/store/list";
  export let list;
  export let sortableLists;
  let sortableCards;
  let cardsEl;
  function disableSortable(event) {
    // console.log(event);
    // console.log(event.detail);
    sortableCards.option("disabled", event.detail);
    sortableLists.option("disabled", event.detail);
  }

  onMount(() => {
    sortableCards = new Sortable(cardsEl, {
      group: "My Cards", // 한 목록에서 다른 목록으로 요소를 끌어오려면(DnD) 두 목록의 그룹 값이 같아야 합니다.
      handle: ".card", // 드래그 핸들이 될 요소의 선택자를 입력합니다.
      delay: 50, // 클릭이 밀리는 것을 방지하기 위해 약간의 지연 시간을 추가합니다.
      animation: 0, // 정렬할 때 애니메이션 속도(ms)를 지정합니다.
      forceFallback: true, // 다양한 환경의 일관된 Drag&Drop(DnD)을 위해 HTML5 기본 DnD 동작을 무시하고 내장 기능을 사용합니다.
      // 요소의 DnD가 종료되면 실행할 핸들러(함수)를 지정합니다.
      onEnd(event) {
        console.log(event); // event 객체의 정렬에 대한 다양한 정보가 들어있어요.
        cards.reorder({
          fromListId: event.from.dataset.listId,
          toListId: event.to.dataset.listId,
          oldIndex: event.oldIndex,
          newIndex: event.newIndex,
        });
      },
    });
  });
</script>

<div class="list">
  <div class="list__inner">
    <div class="list__heading">
      <ListTitle {list} on:editMode={disableSortable} />
      <p>{list.cards.length} cards</p>
    </div>
    <div class="list__cards" bind:this={cardsEl} data-list-id={list.id}>
      {#each list.cards as card (card.id)}
        <Card {card} listId={list.id} on:editMode={disableSortable} />
      {/each}
    </div>
    <CreateCard listId={list.id} on:editMode={disableSortable} />
  </div>
</div>

<style lang="scss">
  .list {
    word-break: break-all;
    width: 290px;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
    // 만약 inline이라면 가로, 세로 값을 가질 수 없고
    // block이라면 수직으로 쌓이게 된다.
    // 두 개의 장점을 합친 inline-block으로 지정한다.
    white-space: normal;
    font-size: 16px;
    margin: 0 4px;
    line-height: 20px;

    :global(&.sortable-ghost) {
      position: relative;
      opacity: 0.2;

      &::after {
        // after를 통해 ghost class위에 새로운 무명 클래스를 추가한다.
        // 무명 클래스는 content는 없고 일단, 스타일만 추가한다.
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;

        border-radius: 4px;
      }
    }

    :global(&.sortable-chosen) {
      // cursor: move;
      cursor: move;
    }

    .list__inner {
      display: flex;
      flex-direction: column;
      max-height: 100%;
      padding: 10px 8px;
      // background-color: #ebecf0;
      background-color: white;
      border-radius: 4px;
      box-sizing: border-box;
      .list__heading {
        margin-bottom: 10px;
        p {
          color: #5e6c84;
          padding: 0 8px;
        }
      }
      .list__cards {
        overflow-y: auto;
        overflow-x: hidden;
        margin-bottom: 10px;
      }
    }
  }
</style>
