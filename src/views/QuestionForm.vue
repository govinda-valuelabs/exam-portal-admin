<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ShortUniqueId from 'short-unique-id';
import axios from 'axios';
import Loader from "../components/Loader.vue";

export default {
  name: "QuestionForm",
  components: { AuthenticatedLayout, Loader },
  data: () => {
    return {
      types: ['radio', 'checkbox', 'boolean', 'text'],
      question: {
        title: "",
        category: '',
        options: [],
        answer: '',
        type: 'radio',
        attachment: false
      },
      categories: [],
      loading: false
    };
  },
  mounted() {
    this.getCategories();
    if (!this.$route.params.id) {
      // For type radio
      for (let i in [0, 1, 2, 3]) {
        this.addOption();
      }
    } else {
      this.getQuestion();
    }
  },
  methods: {
    async getCategories() {
      try {
        const result = await axios.get('http://localhost:8080/category');
        if (result.status == 200) {
          this.categories = result.data;
        }
      } catch (error) {

      }
    },
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
      const { randomUUID } = new ShortUniqueId();
      this.question.options.push({
        _id: randomUUID(),
        value: "",
      });
    },
    onTypeChange(evt) {
      const type = evt.target.value;
      this.question.type = type;
      this.question.options = [];
      if (type == 'radio' || type == 'checkbox') {
        // For type radio
        for (let i in [0, 1, 2, 3]) {
          this.addOption();
        }
      } else if (type == 'boolean') {
        // For type boolean
        for (let i in [0, 1]) {
          this.addOption();
        }
      } else if (type == 'text') {
        this.addOption();
      }
    },
    removeOption(value) {
      this.question.options = this.question.options.filter(
        (op) => op.value != value
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
        <div v-else class="w-full">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="min-w-full">
              <label for="category" class="text-sm font-medium leading-6 text-gray-900">Category</label>
              <div class="mt-2 mb-4">
                <div class="flex rounded-md">
                  <select v-model="question.category" id="category"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="(cat, ind) in categories" :value="cat._id">{{ cat.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="min-w-full">
              <label for="type" class="text-sm font-medium leading-6 text-gray-900">Type</label>
              <div class="mt-2 mb-4">
                <div class="flex rounded-md">
                  <select v-model="question.type" id="type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    @change="onTypeChange">
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="text">Text</option>
                    <option value="boolean">Boolean</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="min-w-full">
              <label for="title" class="text-sm font-medium leading-6 text-gray-900">Title</label>
              <div class="mt-2">
                <div class="flex rounded-md">
                  <input v-model="question.title" type="text" name="title" id="title" autocomplete="title"
                    class="py-2 px-4 text-gray-900 placeholder:text-gray-400 w-full input-text"
                    placeholder="Question Title" />
                </div>
              </div>
            </div>

            <div v-if="question.type != 'text'" class="col-span-full mt-6">
              <label for="email" class="text-sm font-medium leading-6 text-gray-900 text-[18px]">Options</label>
              <div class="mt-2 mb-6">
                <div class="flex mt-6">
                  <table class="w-full text-sm text-left rtl:text-right text-slate-950 dark:text-slate-950">
                    <thead class="text-xs text-slate-950 uppercase bg-gray-50 dark:text-slate-950">
                      <tr>
                        <th scope="col">Value</th>
                        <th scope="col" class="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(op, index) in question.options" :key="index"
                        class="bg-white border-b dark:border-gray-700">
                        <td class="px-6 py-4">
                          <input v-if="['radio', 'boolean', 'checkbox', 'text'].includes(question.type)"
                            v-model="question.options[index].value" type="text"
                            class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                            placeholder="Option Value" />
                        </td>
                        <td class="px-6 py-4 text-right">
                          <button type="button"
                            class="focus:outline-none text-white float-right text-right bg-red-700 hover:bg-red-800 font-medium text-xs px-3 rounded-md py-2"
                            @click="removeOption(op._id)">
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr class="bg-white border-b dark:border-gray-700">
                        <td scope="col" colspan="2" class="px-6 py-4 text-right">
                          <button type="button"
                            class="focus:outline-none text-white float-right text-right bg-blue-700 hover:bg-blue-800 font-medium text-xs px-3 rounded-md py-2"
                            @click="addOption()">
                            Add Option
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div class="min-w-full mt-4">
              <div class="flex items-center">
                <input v-model="question.attachment" checked id="disabled-checked-checkbox" type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="disabled-checked-checkbox"
                  class="ms-2 text-sm font-medium">Attachment Required</label>
              </div>
            </div>

            <div class="col-span-full">
              <div class="mt-2">
                <div class="mt-6 flex items-center justify-end gap-x-6">
                  <router-link to="/question"
                    class="text-xs font-semibold leading-6 text-gray-900 bg-slate-500 px-3 py-2 rounded-md">
                    Cancel
                  </router-link>
                  <button type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                    @click="saveQuestion()">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>