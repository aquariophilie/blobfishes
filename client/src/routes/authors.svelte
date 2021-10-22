<script>
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
  import { apiAuthor } from "../lib/api.author";

  var authors = [];
  var addAuthorForm = {
    _id: "",
    name: "",
    bio: "",
  };

  let addopen = false;
  let updateopen = false;

  function getAuthors() {
    apiAuthor.findAuthors().then((res) => {
      authors = res.data;
    });
  }

  function deleteAuthor(author) {
    apiAuthor.removeAuthor(author._id)
      .then(() => {
        getAuthors();
      })
      .catch((error) => {
        console.error(error);
        getAuthors();
      });
  }

  function editAuthor(author) {
    addAuthorForm._id = author._id;
    addAuthorForm.name = author.name;
    addAuthorForm.bio = author.bio;
    updateopen = true;
    addtoggle();
  }

  function addAuthor() {
    const payload = {
      name: addAuthorForm.name,
      bio: addAuthorForm.bio,
    };
    apiAuthor.insertAuthor(payload)
      .then(() => {
        getAuthors();
      })
      .catch((error) => {
        console.error(error);
        alert(error);
        getAuthors();
      })
      .finally(() => closeDialog());
  }

  function updateAuthor() {
    const payload = {
      name: addAuthorForm.name,
      bio: addAuthorForm.bio,
    };
    apiAuthor.updateAuthor(addAuthorForm._id, payload)
      .then(() => {
        getAuthors();
      })
      .catch((error) => {
        console.error(error);
        alert(error);
        getAuthors();
      })
      .finally(() => closeDialog());
  }

  function addtoggle() {
    //	initForm();
    addopen = !addopen;
  }

  function closeDialog() {
    addAuthorForm._id = "";
    addAuthorForm.name = "";
    addAuthorForm.bio = "";
    addopen = false;
    updateopen = false;
  }

  onMount(getAuthors);
</script>

<svelte:head>
  <title>Blobfishes: Authors</title>
</svelte:head>

<h1>Authors of this Ugly collection of books</h1>
<Button color="success" on:click={addtoggle}>Add Author</Button>
<div class="mt-4 flex flex-col">
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
                Bio
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              />
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
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    class="px-6 rounded-lg bg-gray-500 text-indigo-100 hover:text-indigo-900"
                    on:click={editAuthor(author)}>Edit</button
                  >
                  <button
                    class="px-6 rounded-lg bg-gray-500 text-indigo-100 hover:text-indigo-900"
                    on:click={deleteAuthor(author)}>Delete</button
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
    >{#if updateopen}Edit Author{:else}Add a new Author{/if}</ModalHeader
  >
  <ModalBody>
    <Label for="newName">Name:</Label>
    <Input
      type="text"
      bind:value={addAuthorForm.name}
      placeholder="author name"
    />
    <p />
    <Label for="newBio">Bio:</Label>
    <Input
      type="textarea"
      bind:value={addAuthorForm.bio}
      placeholder="author biography"
    />
  </ModalBody>
  <ModalFooter>
    {#if updateopen}
      <Button color="primary" on:click={updateAuthor}>Update author</Button>
    {:else}
      <Button color="primary" on:click={addAuthor}>Add author</Button>
    {/if}
    <Button color="secondary" on:click={closeDialog}>Cancel</Button>
  </ModalFooter>
</Modal>
