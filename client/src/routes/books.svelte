<script>
  import axios from 'axios'
  import { onMount } from 'svelte';
  import {
    Button,
    ButtonGroup,
    Col,
    Row,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
    Label,
    Table,
  } from "sveltestrap";

  const apiPath = "/api/book";

  var books = [];
  var addBookForm = {
    _id: "",
    title: "",
    authors: [],
    owner: "",
    genres: []
  };

  let addopen = false;
  let updateopen = false;

  function getBooks() {
    axios.get(`${apiPath}`)
      .then((res) => {
        books = res.data
      })
  }

  function deleteBook(book) {
		const path = `${apiPath}/${book.id}`;
		axios
      .delete(path)
			.then(() => {
				getBooks();
			})
			.catch((error) => {
				console.error(error);
				getBooks();
			});

	};

  function editBook(book) {
    addBookForm._id = book._id;
    addBookForm.title = book.title;
    addBookForm.authors = book.authors;
    addBookForm.owner = book.owner;
    addBookForm.genres = book.genres;
    updateopen = true;
    addtoggle();
  }

  function addBook() {
    const path = `${apiPath}`;
    const payload = {
      _id: addBookForm._id,
      title: addBookForm.title,
      authors: addBookForm.authors,
      owner: addBookForm.owner,
      genres: addBookForm.genres
    };
    axios
      .post(path, payload)
      .then(() => {
        getBooks();
      })
      .catch((error) => {
        console.error(error);
        alert(error);
        getBooks();
      })
      .finally(() => closeDialog());
  }
 
  function updateBook() {
    const path = `${apiPath}/${addBookForm._id}`;
    const payload = {
      name: addBookForm.name,
      authors: addBookForm.authors,
      owner: addBookForm.owner,
      genres: addBookForm.genres
    };
    axios
      .put(path, payload)
      .then(() => {
        getBooks();
      })
      .catch((error) => {
        console.error(error);
        alert(error);
        getBooks();
      })
      .finally(() => closeDialog());
  }

  function addtoggle() {
    //	initForm();
    addopen = !addopen;
  }

  function closeDialog() {
    addBookForm._id = "";
    addBookForm.name = "";
    addBookForm.authors = [];
    addBookForm.owner = "";
    addBookForm.genres = [];
    addopen = false;
    updateopen = false;
  }

  onMount(getBooks)

</script>

<svelte:head>
  <title>Blobfishes: Books</title>
</svelte:head>

<h1>Books inside this ugly collection</h1>
<Button color="success" on:click={addtoggle}>Add Book</Button>
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
<Modal isOpen={addopen} {addtoggle}>
  <ModalHeader {addtoggle}
    >{#if updateopen}Edit Book{:else}Add a new Book{/if}</ModalHeader
  >
  <ModalBody>
    <Label for="newTitle">Title:</Label>
    <Input
      type="text"
      bind:value={addBookForm.title}
      placeholder="book title"
    />
    <p />
    <Label for="newAuthor">Author:</Label>
    <Input
      type="text"
      bind:value={addBookForm.authors}
      placeholder="author name"
    />
    <p />
    <Label for="newAuthor">Author:</Label>
    <Input
      type="text"
      bind:value={addBookForm.owner}
      placeholder="owner"
    />
    <Input
      type="text"
      bind:value={addBookForm.genres}
      placeholder="genres"
    />
  </ModalBody>
  <ModalFooter>
    {#if updateopen}
      <Button color="primary" on:click={updateBook}>Update author</Button>
    {:else}
      <Button color="primary" on:click={addBook}>Add author</Button>
    {/if}
    <Button color="secondary" on:click={closeDialog}>Cancel</Button>
  </ModalFooter>
</Modal>
