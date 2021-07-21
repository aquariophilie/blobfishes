<script>
  import axios from 'axios'
  import { onMount } from 'svelte';

  const apiPath = "/api/book"

  var books = []

  function getBooks() {
    axios.get(`${apiPath}`)
      .then((res) => {
        books = res.data
      })
  }

  function deleteBook(book) {
		const path = `${apiPath}/${book.id}`;
		axios.delete(path)
			.then(() => {
				getBooks();
			})
			.catch((error) => {
				console.error(error);
				getBooks();
			});
	};

  function editBook(book) {

  }

  onMount(getBooks)

</script>

<svelte:head>
  <title>Blobfishes: Books</title>
</svelte:head>

<h1>Books inside this ugly collection</h1>

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
                Author
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Genres
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each books as book}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {book.title}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {#each book.authors as author}
                  <p><a href="/author/{author.id}">{author.name}</a></p>
                {/each}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {book.owner}
              </td>
              <td class="px-6 py-4 whitespace-nowrap flex">
                {#each book.genres as genre}
                  <div class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {genre}
                  </div>
                {/each}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="px-6 rounded-lg bg-gray-500 text-indigo-100 hover:text-indigo-900" on:click={editBook(book)}>Edit</button>
                <button class="px-6 rounded-lg bg-gray-500 text-indigo-100 hover:text-indigo-900" on:click={deleteBook(book)}>Delete</button>
              </td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
