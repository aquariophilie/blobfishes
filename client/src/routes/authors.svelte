<script>
  import axios from 'axios'
  import { onMount } from 'svelte';

  const apiPath = "/api/authors"

  var authors = []

  function getAuthors() {
    axios.get(`${apiPath}`)
      .then((res) => {
        authors = res.data
      })
  }

  function deleteAuthor(author) {
		const path = `${apiPath}/${author.id}`;
		axios.delete(path)
			.then(() => {
				getAuthors();
			})
			.catch((error) => {
				console.error(error);
				getAuthors();
			});
	};

  function editAuthor(author) {

  }

  onMount(getAuthors)

</script>

<svelte:head>
  <title>Blobfishes: Authors</title>
</svelte:head>

<h1>Authors of this Ugly collection of books</h1>

<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bio
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each authors as author}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {author.name}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {author.bio}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="px-6 rounded-lg bg-gray-500 text-indigo-100 hover:text-indigo-900" on:click={editAuthor(author)}>Edit</button>
                <button class="px-6 rounded-lg bg-gray-500 text-indigo-100 hover:text-indigo-900" on:click={deleteAuthor(author)}>Delete</button>
              </td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
