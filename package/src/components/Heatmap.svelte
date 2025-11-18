<script lang="ts">
  import Time from "../utils/time";
  import "uno.css";

  let {
    posts,
    weeks = 20,
  }: {
    posts: any[];
    weeks: number;
  } = $props();

  const locale = "zh-cn"; // Current locale

  const days = weeks * 7; // Convert weeks to days for heatmap

  // Get this week's Saturday as reference point for calculating relative dates
  const now = new Date();
  // Get day of week in the configured timezone (0 = Sunday, 6 = Saturday)
  const start = Time.addDays(now, (6 - Time.weekday(now)) % 7);

  // Create 140-day heatmap data structure (roughly 4+ months of activity)
  // Each day contains: date, empty arrays for posts.
  const heatmap = Array.from({ length: days }, (_, day) => ({
    date: Time.subtractDays(start, day), // Calculate date going backwards from today
    posts: [] as any[], // posts published on this day
  }));

  // Populate heatmap with posts data
  posts.forEach((post: any) => {
    // Calculate how many days ago this post was published
    let gap = Time.diffDays(start, post.data.timestamp);

    // Only include posts from the last 100 days
    if (0 <= gap && gap < days) heatmap[gap].posts.push(post);
  });
</script>

<section class="grid grid-flow-col grid-rows-7 gap-1">
  {#each heatmap.reverse() as day}
    {@const number = day.posts.length}
    <figure class="relative group">
      <i
        class="block w-2.5 h-2.5 bg-primary {number > 2
          ? 'opacity-100'
          : number > 1
            ? 'opacity-70'
            : number > 0
              ? 'opacity-40'
              : 'opacity-10'}"
      ></i>

      <div
        class="absolute left-0 bottom-full w-max -translate-x-1/2 flex flex-col mb-1 rd-1 px-2 py-2 text-size-xs c-background bg-primary pop"
      >
        <time class="font-bold">{Time.date.locale(day.date, locale)}</time>
        {#if number > 0}
          {#if day.posts.length > 0}
            <p class="my-1">
              {day.posts.length}篇文章
            </p>
            <ul class="flex flex-col gap-0.5">
              {#each day.posts as post}
                <a
                  href={`/posts/${post.id}`}
                  aria-label={post.data.title}
                  class="ml-1 link">{post.data.title}</a
                >
              {/each}
            </ul>
          {/if}
          <!--      {#if day.jottings.length > 0}
            <p class="my-1">
              {t("home.heatmap.jotting", { count: day.jottings.length })}：
            </p>
            <ul class="flex flex-col gap-0.5">
              {#each day.jottings as jotting}
                <a
                  href={getRelativeLocaleUrl(
                    locale,
                    `/jotting/${monolocale ? jotting.id : jotting.id.split("/").slice(1).join("/")}`,
                  )}
                  aria-label={jotting.data.title}
                  class="ml-1 link">{jotting.data.title}</a
                >
              {/each}
            </ul>
          {/if}
  -->
        {:else}
          <p class="mt-1">"神马都没有~"</p>
        {/if}
      </div>
    </figure>
  {/each}
</section>
