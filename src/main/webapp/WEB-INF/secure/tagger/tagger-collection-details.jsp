<jsp:include page="../header.jsp"/>
<body>
  <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/taggui/tagger-collection-details/Application.js"></script>

  <script type="text/javascript">
      CRISIS_ID = ${crisisId};
      CRISIS_NAME = "${name}";
      CRISIS_TYPE = "${crisisType}";
      CRISIS_CODE = "${code}";
  </script>

</body>
</html>