<jsp:include page="header.jsp"/>
<body>
  <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/aidrfm/collection-details/Application.js"></script>
  <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/aidrfm/common/lang.js"></script>

  <script type="text/javascript">
      COLLECTION_ID = ${id};
      CRISES_EXIST = ${crisesExist};
  </script>

</body>
</html>