<script>
  import Header from "./components/Header.svelte";
  import ListContainer from "./components/ListContainer.svelte";
  // 상대 경로를 사용하는 것은 디렉토리가 변경되었을 때 불안정하다.
  // 따라서 경로 별칭을 사용하자

  Object.assign(document.body.style, {
    backgorundColor: "darkgray",
    backgroundImage: "url(/images/bg.jpg)",
    backgroundSize: "cover",
  });
  // 병합 : 첫 번째 인자에는 병합할 대상, 두번째는 병합할 데이터
  // 작성할 속성이 많을수록 이러한 방식이 효율적임
</script>

<Header />
<ListContainer />
