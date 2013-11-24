<jsp:include page="header.jsp"/>
<body>
  <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/taggui/attribute-details/Application.js"></script>

  <script type="text/javascript">
      ATTRIBUTE_ID = ${id};
      USER_ID = ${userId};
  </script>

</body>
</html>