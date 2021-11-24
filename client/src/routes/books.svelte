<script>
  import axios from "axios";
  import { onMount } from "svelte";
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
  import { apiBook } from "../lib/api.book";
  import { apiAuthor } from "../lib/api.author";

  const genres = [
    "science fiction",
    "comedy",
    "action and adventure",
    "classics",
    "fantasy",
    "horror",
    "thriller",
  ];
  var books = [];
  var authors = [];
  var addBookForm = {
    _id: "",
    title: "",
    authors: [],
    owner: "",
    genres: [],
  };

  let addopen = false;
  let updateopen = false;

  function getBooks() {
    apiBook.findBooks().then((res) => {
      books = res.data;
    });
  }

  function getAuthors() {
    apiAuthor.findAuthors().then((res) => {
      authors = res.data;
    });
  }

  function deleteBook(book) {
    apiBook
      .removeBook(book._id)
      .then(() => {
        getBooks();
      })
      .catch((error) => {
        console.error(error);
        getBooks();
      });
  }

  function editBook(book) {
    addBookForm._id = book._id;
    addBookForm.title = book.title;
    if (Array.isArray(book.authors)) {
      addBookForm.authors = book.authors.map((item) => item._id);
    }
    addBookForm.owner = book.owner;
    if (Array.isArray(book.genres)) {
      for (const genre of book.genres) {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      }
    }
    addBookForm.genres = book.genres;
    updateopen = true;
    addtoggle();
  }

  function addBook() {
    const payload = {
      _id: addBookForm._id,
      title: addBookForm.title,
      authors: addBookForm.authors,
      owner: addBookForm.owner,
      genres: addBookForm.genres,
    };
    apiBook
      .insertBook(payload)
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
    const payload = {
      authors: addBookForm.authors,
      owner: addBookForm.owner,
      genres: addBookForm.genres,
      title: addBookForm.title,
    };
    apiBook
      .updateBook(addBookForm._id, payload)
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
    addBookForm.title = "";
    addBookForm.authors = [];
    addBookForm.owner = "";
    addBookForm.genres = [];
    addopen = false;
    updateopen = false;
  }

  onMount(() => {
    getBooks();
    getAuthors();
  });
</script>

<svelte:head>
  <title>Blobfishes: Books</title>
</svelte:head>

<h1>Books inside this ugly collection</h1>
<Button color="success" on:click={addtoggle}>Add Book</Button>
<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div
        class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Author
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Owner
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Genres
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              />
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
                    <div
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      {genre}
                    </div>
                  {/each}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    class="px-6 rounded-lg bg-gray-500 text-indigo-100 hover:text-indigo-900"
                    on:click={editBook(book)}>Edit</button
                  >
                  <button
                    class="px-6 rounded-lg bg-gray-500 text-indigo-100 hover:text-indigo-900"
                    on:click={deleteBook(book)}>Delete</button
                  >
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
    <select
      class="form-control"
      name="authors"
      multiple
      bind:value={addBookForm.authors}
    >
      {#each authors as value}
        <option value={value._id}>
          {value.name}
        </option>
      {/each}
    </select>
    <p />
    <Label for="owner">Owner:</Label>
    <Input type="text" bind:value={addBookForm.owner} placeholder="owner" />
    <Label for="genre">Genre:</Label>
    <select
      class="form-control"
      name="genres"
      multiple
      bind:value={addBookForm.genres}
    >
      {#each genres as genre}
        <option value={genre}>
          {genre}
        </option>
      {/each}
    </select>
  </ModalBody>
  <ModalFooter>
    {#if updateopen}
      <Button color="primary" on:click={updateBook}>Update Book</Button>
    {:else}
      <Button color="primary" on:click={addBook}>Add Book</Button>
    {/if}
    <Button color="secondary" on:click={closeDialog}>Cancel</Button>
  </ModalFooter>
</Modal>
