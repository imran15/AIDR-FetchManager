<jsp:include page="../header.jsp"/>
<body>
  <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/taggui/model-details/Application.js"></script>

  <script type="text/javascript">
      CRISIS_ID = ${crisisId};
      MODEL_ID = ${modelId};
      CRISIS_CODE = "${code}";
      MODEL_NAME = "${modelName}";
      CRISIS_NAME = "${crisisName}";
  </script>

</body>
</html>