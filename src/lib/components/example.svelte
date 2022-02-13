<script lang="ts">
  import GithubLogo from './github-logo.svelte';
  import sdk from '@stackblitz/sdk';

  export let title: string;
  export let description: string;
  export let repository: string;
  export let openFile: string;

  let stackblitzButton: HTMLButtonElement;
  let gitpodButton: HTMLButtonElement;

  // GitHub repository URL.
  let repositoryUrl = `https://github.com/${repository}`;

  // function handleEmbedStackBlitz() {
  //   sdk.embedGithubProject(
  //     embed,
  //     'maiertech/sveltekit-example-route-matching',
  //     {
  //       openFile: 'src/routes/index.ts',
  //       height: 500,
  //     }
  //   );
  // }

  function launchWithStackBlitz() {
    sdk.openGithubProject(repository, {
      openFile,
    });
    stackblitzButton.blur();
  }

  function launchWithGitpod() {
    window.open(`https://gitpod.io/#${repositoryUrl}`, '_blank');
    gitpodButton.blur();
  }
</script>

<aside
  class="not-prose -mx-4 overflow-auto bg-primary-lighter text-white sm:-mx-6 lg:-mx-8"
>
  <div class="min-w-fit px-4 py-5 sm:px-6 lg:px-8">
    <h1 class="mb-4 text-2xl font-medium leading-6 text-background">
      {title}
    </h1>
    <div class="mb-6 max-w-xl text-base">
      <p>{description}</p>
    </div>
    <div class="flex flex-wrap items-center gap-5">
      <button
        on:click={launchWithStackBlitz}
        bind:this={stackblitzButton}
        type="button"
        class="whitespace-nowrap rounded-full bg-background px-4 py-2 font-medium text-text-lighter focus:outline-none focus:ring-4 focus:ring-background focus:ring-offset-2 focus:ring-offset-text-lighter sm:text-sm"
      >
        Run with StackBlitz
      </button>
      <button
        on:click={launchWithGitpod}
        bind:this={gitpodButton}
        type="button"
        class="whitespace-nowrap rounded-full bg-background px-4 py-2 font-medium text-text-lighter focus:outline-none focus:ring-4 focus:ring-background focus:ring-offset-2 focus:ring-offset-text-lighter sm:text-sm"
      >
        Run with Gitpod
      </button>
      <a href={repositoryUrl} class="!text-background">
        <span class="sr-only">GitHub logo</span>
        <GithubLogo class="h-9 w-9" />
      </a>
    </div>
  </div>
</aside>
