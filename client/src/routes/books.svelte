
<script>
  import axios from 'axios'
  import { onMount } from 'svelte';

  var books = []

  function getBooks() {
    axios.get('/api/books')
      .then((res) => {
        books = res.data
      })
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
                <a href="/" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
