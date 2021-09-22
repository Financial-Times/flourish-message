export const waitForIframes = () => {
  const embeds = document.querySelectorAll(".flourish-embed");

  return Promise.all(
    embeds.map(async (embed) => {
      if (embed.querySelector("iframe")) {
        return embed.querySelector("iframe");
      }

      return new Promise((resolve) => {
        const observer = new MutationObserver((mutations) => {
          if (mutations.some((mut) => mut.type === "childList")) {
            if (embed.querySelector("iframe"))
              resolve(embed.querySelector("iframe"));
          }
        });
        observer.observe(embed);
      });
    })
  );
};
