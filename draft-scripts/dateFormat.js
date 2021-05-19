// Temporarily removed from dateFormat.html
// <script>
  const app = new Vue({
    el: '#app',
    data: {
      snippetTitle: 'dateFormat',
      snippets: {
        'date',
        'dateDay',
        'dateDayFr',
        'dateEN',
        'dateUS'
      }
    }
  })
// </script>

/* snippets: {
  snippetTitle: 'dateFormat',
  snippetDate: 'date', // Standard US date format
  snippetDateDay: 'dateDay', // US date format with day name
  snippetDateDayFr: 'dateDayFr', // French date format with day name
  snippetDateEN: 'dateEN', // British date format
  snippetDateUS: 'dateUS' // US date format
} */

---
// Code from Katie O'Brien
export default {
  data:{
    myDate: '2020-10-10'
},
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-us', options)
    },
    formatDateDay(date) {
      const options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-us', options)
    },
    formatDateDayFr(date) {
      const options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('fr', options)
    },
    formatDateEN(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    },
    formatDateUS(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-US', options)
    },
  }
};
