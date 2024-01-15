<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    answer: { },
    attachment: {
        type: Object
    },
    feedback: {
        type: String
    }
});

function getAnswer(answer) {
    let ans = '';
    if (answer.answer) {
        return answer.answer;
    }
    answer.option.forEach((o) => {
        ans += o.value + ', '
    });

    if (ans) {
    ans = ans.slice(0, -2);
    }

    return ans;
}

</script>
<template>
    <div class="ml-6 w-full">
        <Listbox v-if="question.options.length" :options="question.options" optionLabel="value"
            class="w-full w-28rem">
            <template #option="{ option }">
                <div class="flex">
                    <Button icon="pi pi-check-circle" severity="secondary" />
                    <p class="ml-6">{{ option.value }}</p>
                </div>
            </template>
        </Listbox>
        <div class="w-1/2">
            <img v-if="attachment" :src="attachment" class="attachment"
            alt="attachment" v-tooltip.top="'Attachment'">
            <img v-if="attachment" :src="attachment" class="attachment-preview"
            alt="attachment">
        </div>
        <div class="flex flex-row">
            <p v-if="answer" class="font-semibold text-green-500">User's Answer : {{
                getAnswer(answer) }} </p>
            <p v-else class="p-2 font-semibold text-green-500">No Answer</p>
        </div>
        <div class="flex">
            <p v-if="feedback" class="font-semibold text-green-500">User's Remark : {{
                feedback }} </p>
        </div>
    </div>
</template>