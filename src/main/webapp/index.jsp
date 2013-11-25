<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>AIDR - Login</title>

    <link rel="shortcut icon" type="image/ico" href="${pageContext.request.contextPath}/resources/img/favicon.ico" />

    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/style.css"/>

</head>

<body class="mainbody">

<div class="headerWrapper">
    <div class="header"><img class="headeraidrlogo" src="${pageContext.request.contextPath}/resources/img/AIDR/aidr_logo_240x90.png"></div>
</div>

<div class="mainWraper">
    <div class="main" >
        <div class="center-img"><img src="${pageContext.request.contextPath}/resources/img/AIDR/AIDR_PRIMARY_CMYK_COLOUR_HR.png" height="90"/></div>
        <div >
            </br>
        </br>
            <p>Welcome. To continue please sign-in using your Twitter credentials.</p>
            <div>
                <form action="signin/twitter" method="POST">
                    <input type="image" src="${pageContext.request.contextPath}/resources/img/tweeterSignin.png" style="border: 0;">

                </form>
            </div>
        </div>
    </div>
</div>

<div class="site-footer" style="position:absolute;bottom: 0;">
    <div class="footer">
        <a style="text-decoration: none;color: #ffffff" href="http://www.qcri.qa/">A project by <img align="middle" id="footerqcrilogo" src="${pageContext.request.contextPath}/resources/img/qcri-gray-horiz.png"></a>
    </div>
</div>

</body>
</html>