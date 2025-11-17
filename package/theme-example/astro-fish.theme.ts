import fish from "astro-fish";

export default fish({
  config: {
    lang: "en",
    title: "Title",
    description: "A beautiful blog theme for Astro",
    licenseId: "CC-BY-4.0",
    author: "Your Name",
    side: {
      title: "title",
      sub: "sub title",
      bio: "Your bio, about 50~90 characters, line wrap",
      navHome: {
        title: "Home",
      },
      footer: [
        {
          title: "Twitter",
          link: "https://x.com/",
          icon: "simple-icons:twitter",
        },
        {
          title: "GitHub",
          link: "https://github.com/yuhanawa/astro-fish",
          icon: "simple-icons:github",
        },
      ],
    },
  },
  pages: {},
  overrides: {
    components: {
      // your can override components here
    },
    custom: {
      // see https://astro-fish.vercel.app/posts/custom#add-custom-components
    },
  },
});
