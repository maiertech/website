<script lang="ts">
  import GitHubLogo from './github-logo.svelte';
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

<aside>
  <h1>{title}</h1>
  <p>{description}</p>
  <div class="buttons">
    <button
      on:click={launchWithStackBlitz}
      bind:this={stackblitzButton}
      type="button"
    >
      Run with StackBlitz
    </button>
    <button on:click={launchWithGitpod} bind:this={gitpodButton} type="button">
      Run with Gitpod
    </button>
    <a href={repositoryUrl}>
      <GitHubLogo />
    </a>
  </div>
</aside>

<style>
  aside {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: var(--size-fluid-2);
    background-color: var(--surface-2);
    padding: var(--size-3);
    margin-inline: calc(-1 * var(--size-3));
  }

  h1 {
    font-size: var(--font-size-fluid-1);
    font-weight: var(--font-weight-6);
    max-inline-size: var(--size-header-2);
  }

  aside p {
    margin: 0;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--size-fluid-2);
  }

  .buttons a {
    width: var(--size-fluid-4);
  }
</style>
