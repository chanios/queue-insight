<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import Input from "$lib/components/ui/input/input.svelte";
    import BoardItem from "$lib/self/BoardItem.svelte";

    let { data } = $props();

    let query = $state("");

    let board_list_filtered = $derived(
        data.boardList.board_list.filter((item) =>
            item.board_name.includes(query),
        ),
    );
</script>

<div class="grid gap-3 mt-3">
    <div class="flex gap-3">
        <Input bind:value={query} placeholder="ค้นหาร้าน"></Input>
        <Button>ค้นหา</Button>
    </div>
    <div class="font-bold">ร้านทั้งหมด({board_list_filtered.length})</div>
    {#each board_list_filtered as item}
        <!-- <div class="font-bold">{JSON.stringify(item)}</div> -->
        <BoardItem {item} />
    {/each}
</div>
