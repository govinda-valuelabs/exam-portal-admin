<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import uniqid from "uniqid";
import axios from 'axios';
import Loader from "../components/Loader.vue";

export default {
  name: "ExamDetail",
  components: { AuthenticatedLayout, Loader },
  data: () => {
    return {
      question: {
        title: "",
        options: [],
        answer: null,
      },
      loading: false
    };
  },
  mounted() {
    if (!this.$route.params.id) {
      this.addOption();
    } else {
      this.getQuestion();
    }
  },
  methods: {
    async getQuestion() {
      try {
        const result = await axios.get('http://localhost:8080/question/' + this.$route.params.id);
        if (result.status == 200) {
          this.question = result.data;
        }
      } catch (error) {
        
      }
      
    },
    async saveQuestion() {
      this.loading = true;
      try {
        let result;
        if (this.$route.params.id) {
          result = await axios.patch('http://localhost:8080/question/' + this.$route.params.id, this.question);
        } else {
          result = await axios.post('http://localhost:8080/question', this.question);
        }
        if (result.status == 201) {
          this.$router.push('/question')
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
      this.loading = false;
    },
    addOption() {
      const id = uniqid();
      this.question.options.push({
        _id: id,
        value: "",
      });
    },
    removeOption(id) {
      this.question.options = this.question.options.filter(
        (op) => op._id != id
      );
    },
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="space-y-12 ml-6 w-1/2">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-[32px] font-semibold leading-7 text-gray-900 mt-4">
          Question
        </h2>
        <Loader v-if="loading" class="mt-10" />
        <div
          v-else
          class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        >
          <div class="sm:col-span-4">
            <label
              for="title"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Title</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="question.title"
                  type="text"
                  name="title"
                  id="title"
                  autocomplete="title"
                  class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                  placeholder="Question Title"
                />
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Options</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              >
                <table
                  class="w-full text-sm text-left rtl:text-right text-slate-950 dark:text-slate-950"
                >
                  <thead
                    class="text-xs text-slate-950 uppercase bg-gray-50 dark:text-slate-950"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">Value</th>
                      <th scope="col" class="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(op, index) in question.options"
                      :key="index"
                      class="bg-white border-b dark:border-gray-700"
                    >
                      <td class="px-6 py-4">
                        <input
                          v-model="question.options[index].value"
                          type="text"
                          name="title"
                          id="title"
                          autocomplete="title"
                          class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                          placeholder="Option Value"
                        />
                      </td>
                      <td class="px-6 py-4 text-right">
                        <button
                          type="button"
                          class="focus:outline-none text-white float-right text-right bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          @click="removeOption(op._id)"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                class="rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 float-right mt-6"
                @click="addOption()"
              >
                Add Option
              </button>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Answer</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm"
              >
                <div
                  v-for="(option, i) in question.options"
                  :key="`key${i}`"
                  class="flex items-center"
                  >
                  <input
                    v-model="question.answer"
                    :id="`default-radio-${i}`"
                    type="radio"
                    :value="option._id"
                    name="default-radio"
                    class="flex rounded-md sm:max-w-md ml-2"
                    @change="question.answer = $event.target.value"
                  />
                  <label
                    :for="`default-radio-${i}`"
                    class="ms-2 text-sm font-medium text-black dark:text-black ml-2"
                    >{{ option.value }}</label
                  >
                </div>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
              <router-link
                to="/question"
                class="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </router-link>
              <button
                type="button"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="saveQuestion()"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>