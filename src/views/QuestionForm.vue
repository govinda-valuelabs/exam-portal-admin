<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ShortUniqueId from 'short-unique-id';
import axios from 'axios';
import { useToast } from "primevue/usetoast";

export default {
  name: "QuestionForm",
  components: { AuthenticatedLayout },
  data: () => {
    return {
      types: [
        { value: 'radio', text: 'Radio' },
        { value: 'checkbox', text: 'Checkbox' },
        { value: 'boolean', text: 'Boolean' },
        { value: 'text', text: 'Text' }
      ],
      question: {
        title: "",
        category: '',
        options: [],
        answer: '',
        type: 'radio',
        attachment: false
      },
      categories: [],
      loading: false,
      toast: useToast()
    };
  },
  computed: {
    heading() {
      return this.$route.params.id ? 'Edit Question' : 'Add Question';
    }
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
          this.toast.add({ severity: 'success', summary: 'Success', detail: 'Question was saved successfully!', life: 3000 })
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
      const type = evt.value;
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
        (op) => op._id != value
      );
    },
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="block m-auto w-full p-4">
      <h1>{{ heading }}</h1>
      <div class="card flex mb-6">
        <span class="p-float-label w-full">
          <InputText id="title" class="w-full" v-model="question.title" placeholder="Enter question title" />
          <label for="title">Title</label>
        </span>
      </div>

      <div class="card flex mb-6 w-full">
        <Dropdown v-model="question.category" :options="categories" optionLabel="name" optionValue="_id" class="w-full"
          placeholder="Select a category" />
      </div>

      <div class="card flex mb-6 w-full">
        <Dropdown v-model="question.type" :options="types" optionLabel="text" optionValue="value" class="w-full"
          placeholder="Select a type" @change="onTypeChange" />
      </div>

      <div v-if="question.type != 'text'" class="col-span-full mt-6">
        <DataTable :value="question.options" tableStyle="min-width: 50rem">
          <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <span class="text-xl text-900 font-bold">Options</span>
            </div>
          </template>
          <Column field="value" header="Value" class="w-full">
            <template #body="{ data, field }">
              <InputText id="value" class="w-full" v-model="data[field]" />
            </template>
          </Column>
          <Column field="_id" header="Remove">
            <template #body="{ data }">
              <Button icon="pi pi-times" severity="danger" rounded v-tooltip.top="'Remove'"
                @click="removeOption(data._id)" />
            </template>
          </Column>
          <template #footer>
            <div class="flex align-items-end" style="justify-content: end; margin-right: 13px;">
              <Button icon="pi pi-plus-circle" rounded raised v-tooltip.top="'Add Option'" style="float: right;"
                @click="addOption()" />
            </div>
          </template>
        </DataTable>
        <div class="card flex justify-content-start mt-6">
          <Checkbox v-model="question.attachment" :binary="true" />
          <label for="ingredient1" class="ml-2"> Attachment Required </label>
        </div>
      </div>
      <div class="card flex justify-content-center flex-wrap gap-3">
        <RouterLink to="/question">
          <Button label="Back" severity="secondary" />
        </RouterLink>
        <Button label="Save" severity="success" @click="saveQuestion()"/>
      </div>
    </div>
  </AuthenticatedLayout>
</template>