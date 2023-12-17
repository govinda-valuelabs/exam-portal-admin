<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from 'axios';
import Loader from "../components/Loader.vue";

export default {
  name: "QuestionForm",
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
      for (let i in [0, 1, 2, 3]) {
        this.addOption();
      }
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
      this.question.options.push({ value: "" });
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
              <label for="title" class="text-sm font-medium leading-6 text-gray-900">Title</label>
              <div class="mt-2">
                <div
                  class="flex rounded-md">
                  <input v-model="question.title" type="text" name="title" id="title" autocomplete="title"
                    class="py-2 px-4 text-gray-900 placeholder:text-gray-400 w-full input-text"
                    placeholder="Question Title" />
                </div>
              </div>
            </div>

            <div class="col-span-full mt-6">
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
                        <td class="py-4">
                          <input
                            v-model="question.options[index].value" type="text"
                            name="title"
                            :id="`title-${op.value}`"
                            autocomplete="title"
                            class="py-2 px-4 text-gray-900 placeholder:text-gray-400 w-full input-text"
                            placeholder="Option Value" />
                        </td>
                        <td class="text-right">
                          <button type="button"
                            class="focus:outline-none text-white float-right text-right bg-red-700 hover:bg-red-800 font-medium text-xs px-3 rounded-md py-2"
                            @click="removeOption(op.value)">
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button type="button"
                  class="rounded-md bg-cyan-700 px-3 py-2 text-xs font-semibold text-white shadow-sm focus-visible:outline-cyan-600 float-right mt-6"
                  @click="addOption()">
                  Add Option
                </button>
              </div>
            </div>
            <div class="col-span-full mt-10">
              <label for="password" class="text-sm font-medium leading-6 text-gray-900 text-[18px]">Answer</label>
              <div class="mt-2">
                <div class="flex-inline rounded-md shadow-sm">
                  <div v-for="(option, i) in question.options" :key="`key${i}`" class="flex items-center mb-4">
                    <input
                      v-model="question.answer" :id="`default-radio-${i}`"
                      type="radio"
                      :value="option.value"
                      name="default-radio"
                      class="flex rounded-md sm:max-w-md ml-2"
                      @change="question.answer = $event.target.value"
                    />
                    <label :for="`default-radio-${i}`" class="ms-2 text-sm font-medium text-black dark:text-black ml-2">{{
                      option.value }}</label>
                  </div>
                </div>
              </div>
              <div class="mt-6 flex items-center justify-end gap-x-6">
                <router-link to="/question" class="text-xs font-semibold leading-6 text-gray-900 bg-slate-500 px-3 py-2 rounded-md">
                  Cancel
                </router-link>
                <button type="button"
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                  @click="saveQuestion()">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>