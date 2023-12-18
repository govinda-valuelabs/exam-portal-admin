export default {
  data: () => {
    return {
      doughnut: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: []
          }
        ]
      },
      radar: {
        labels: [],
        datasets: [
          {
            label: 'Question Attempted',
            backgroundColor: 'rgba(27, 112, 37,0.2)',
            borderColor: 'rgba(27, 112, 37,1)',
            pointBackgroundColor: 'rgba(27, 112, 37,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(27, 112, 37,1)',
            data: []
          }
        ],
      },
      polarArea: {
        labels: [],
        datasets: [
          {
            label: 'Question Attempted',
            backgroundColor: 'rgba(255,99,132,0.2)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: []
          }
        ]
      }
    }
  }
}