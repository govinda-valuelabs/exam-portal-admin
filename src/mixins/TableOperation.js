export default {
    data: function() {
        return {
            selectedRows: [],
        }
    },
    methods: {
        serialNumberBody(rowData, rowIndex) {
            return rowIndex + 1;
        },
        checkboxBody(rowData) {
            return h('Checkbox', {
              modelValue: this.isSelected(rowData),
              'onUpdate:modelValue': (value) => this.handleCheckboxChange(value, rowData),
            });
          },
        isSelected(rowData) {
            return this.selectedRows.includes(rowData);
        },
        handleCheckboxChange(event, rowData) {
            if (event) {
                this.selectedRows.push(rowData);
            } else {
                this.selectedRows = this.selectedRows.filter((row) => row !== rowData);
            }
        },
        deleteSelected() {
            // Implement delete logic for selected rows
            console.log('Selected Rows:', this.selectedRows);
        },
    }
}