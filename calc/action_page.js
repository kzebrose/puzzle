<!DOCTYPE html>
<html>
<body>

<p>Enter some text in the fields below, then press the "Submit form" button to submit the form.</p>

<form id="myForm" action="/action_page.php">
  First name: <input type="text" name="fname"><br>
  Last name: <input type="text" name="lname"><br><br>
  <input type="button" onclick="myFunction()" value="Submit form">
</form>

<script>
function myFunction() {
  document.getElementById("myForm").submit();
}
</script>

</body>
</html>
