<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Clock, MapPin, Users, CircleAlert } from "lucide-svelte";
    import type { BoardItem } from "$lib/queqLib";

    let { item }: { item: BoardItem } = $props();

    // Helper function to get queue status info
    function getQueueStatus(status: number) {
        switch (status) {
            case 0:
                return {
                    text: "ปิด",
                    variant: "destructive" as const,
                    icon: CircleAlert,
                };
            case 1:
                return {
                    text: "เปิด",
                    variant: "default" as const,
                    icon: Clock,
                };
            case 2:
                return {
                    text: "ปิดรับคิว",
                    variant: "secondary" as const,
                    icon: CircleAlert,
                };
            default:
                return {
                    text: "ไม่ทราบสถานะ",
                    variant: "outline" as const,
                    icon: CircleAlert,
                };
        }
    }

    const queueStatus = getQueueStatus(item.queueing_status);
</script>

<Card.Root
    class="group hover:shadow-md transition-all duration-300 border-0 shadow-sm hover:shadow-lg"
>
    <Card.Content class="p-0">
        <div class="flex items-center gap-4 p-4">
            <!-- Restaurant Image -->
            <div class="relative shrink-0">
                <img
                    src={item.board_picture_url}
                    alt={item.board_name}
                    class="w-20 h-20 rounded-xl object-cover shadow-sm ring-1 ring-border/50"
                />
                {#if item.queueing_status === 2}
                    <div
                        class="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center"
                    >
                        <CircleAlert class="w-6 h-6 text-white" />
                    </div>
                {/if}
            </div>

            <!-- Main Content -->
            <div class="flex-1 min-w-0 space-y-2">
                <!-- Restaurant Name -->
                <div class="flex items-start justify-between gap-2">
                    <h3
                        class="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors"
                    >
                        {item.board_name}
                    </h3>
                    <Badge variant={queueStatus.variant} class="shrink-0 gap-1">
                        <svelte:component
                            this={queueStatus.icon}
                            class="w-3 h-3"
                        />
                        {queueStatus.text}
                    </Badge>
                </div>

                <!-- Location -->
                <div class="flex items-center gap-2 text-muted-foreground">
                    <MapPin class="w-4 h-4 shrink-0" />
                    <span class="text-sm truncate">{item.board_location}</span>
                </div>

                <!-- Queue Info and Actions -->
                <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-4 text-sm">
                        <!-- Queue Count -->
                        <div class="flex items-center gap-2">
                            <Users class="w-4 h-4 text-muted-foreground" />
                            <span class="font-medium">
                                {item.number_of_waiting}
                            </span>
                            <span class="text-muted-foreground">คิว</span>
                        </div>

                        <!-- Distance if available -->
                        {#if item.distance}
                            <div class="text-muted-foreground">
                                {(item.distance / 1000).toFixed(1)} กม.
                            </div>
                        {/if}
                    </div>

                    <!-- Action Button -->
                    {#if item.queueing_status === 1}
                        <Button size="sm" class="shrink-0">เข้าคิว</Button>
                    {:else if item.queueing_status === 2}
                        <Button
                            size="sm"
                            variant="outline"
                            disabled
                            class="shrink-0"
                        >
                            ปิดรับคิว
                        </Button>
                    {:else}
                        <Button
                            size="sm"
                            variant="ghost"
                            disabled
                            class="shrink-0"
                        >
                            ปิด
                        </Button>
                    {/if}
                </div>

                <!-- Queue Lines Info (if available and open) -->
                {#if item.queue_line_list && item.queue_line_list.length > 0 && item.queueing_status === 1}
                    <div class="flex gap-2 flex-wrap">
                        {#each item.queue_line_list as queueLine}
                            <Badge variant="outline" class="text-xs">
                                {queueLine.queue_line_name}
                            </Badge>
                        {/each}
                    </div>
                {/if}

                <!-- Closed Reason (if closed) -->
                {#if item.queueing_status === 2 && item.closed_reason}
                    <div
                        class="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg"
                    >
                        {item.closed_reason}
                    </div>
                {/if}
            </div>
        </div>
    </Card.Content>
</Card.Root>
