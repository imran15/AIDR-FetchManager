<jsp:include page="header.jsp"/>
<title>AIDR - Add training examples</title>
</head>
<body>
  <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/taggui/training-examples/Application.js"></script>

  <script type="text/javascript">
      CRISIS_ID = ${crisisId};
      CRISIS_CODE = "${code}";
      CRISIS_NAME = "${crisisName}";
      MODEL_ID = ${modelId};
      MODEL_FAMILY_ID = ${modelFamilyId};
      MODEL_NAME = "${modelName}";
  </script>

</body>
</html>