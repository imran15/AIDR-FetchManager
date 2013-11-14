<jsp:include page="../header.jsp"/>
<body>
  <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/taggui/new-custom-attribute/Application.js"></script>

  <script type="text/javascript">
      CRISIS_CODE = "${code}";
      CRISIS_ID = ${crisisId};
      CRISIS_NAME = "${crisisName}";
  </script>

</body>
</html>