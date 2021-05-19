/*
> Jim Carroll |
> 10/22/2020 |
> [GitHub Profile](https://github.com/pulamusic)
*/

anychart.onDocumentReady(function() {

  // set the data
  let data = [
    {"x": "Mandarin chinese", "value": 921500000, category: "Sino-Tibetan"},
    {"x": "Spanish", "value": 463000000, category: "Indo-European"},
    {"x": "English", "value": 369700000, category: "Indo-European"},
    {"x": "Hindustani", "value": 342000000, category: "Indo-European"},
    {"x": "Bengali", "value": 261000000, category: "Indo-European"},
    {"x": "Portuguese", "value": 229000000, category: "Indo-European"},
    {"x": "Russian", "value": 267000000, category: "Indo-European"},
    {"x": "Japanese", "value": 129000000, category: "Japonic"},
    {"x": "Cantonese Chinese", "value": 84500000, category: "Sinitic"},
    {"x": "Arabic", "value": 422000000, category: "Afro-Asiatic"},
    {"x": "Malay", "value": 281000000, category: "Austronesian"},
    {"x": "French", "value": 229000000, category: "Indo-European"},
    {"x": "Hausa", "value": 150000000, category: "Afro-Asiatic"},
    {"x": "Punjabi", "value": 148000000, category: "Indo-European"},
    {"x": "German", "value": 129000000, category: "Indo-European"},
    {"x": "Persian", "value": 121000000, category: "Indo-European"}
  ]

  // create the word cloud chart
  let chart = anychart.tagCloud(data)

  // chart title
  chart.title('16 most spoken languages, or thereabouts')

  // array of angles at which the words will be laid out
  // chart.angles([0])
  chart.angles([0, 90, 180, 270])


  // color range
  chart.colorRange(true)

  // color range length
  chart.colorRange.length('80%')

  // display the word cloud chart
  chart.container("container")
  chart.draw()
})
