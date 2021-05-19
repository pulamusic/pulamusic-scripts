/*


<script src="https://gist.githubusercontent.com/pulamusic/2496f66a0d50e35737a0f76ba654a9d2/raw/ff99ff916ce858d1e375e67d5391456ec3e1159a/copyright.js" type="text/javascript"></script>

<p>&copy; <span id="year-tag"></span> <a href="http://pulamusic.com" target="_blank">Jim Carroll</a></p>
*/

let currentYear = new Date().getFullYear()

year = () => {
  if (currentYear === 2020) {
    document.getElementById('yearTag').innerHTML = currentYear
  } else {
    document.getElementById('yearTag').innerHTML = "2020-" + currentYear
  }
}

year()
