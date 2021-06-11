# Login Site using Nodejs and MySQL

Nodejs와 MySQL을 사용하여 미니 트위터 구현하기  
Implementing a Mini Tweeter using Nodejs and MySQL  

사용 기술: Nodejs, MySQL  
Skill: Nodejs, MySQL  

## 2021-06-07 Mon
로그인과 회원가입 기능을 구현하기로 결정  
Deciding to implement login and membership functions  

새로 만든 프로젝트가 작동이 정상적으로 되지 않음  
The newly created project doesn't work properly  

따라서 기존 실습에 사용했었던 프로젝트를 그대로 가져와서 코드를 수정하기로 함  
Therefore, I plan to modify codes by importing the project that I used in the practicing codes.  

Node_modules은 파일의 크기가 커서 올리지 않음.  
Node_modules is too big to be not uploaded.  

## 2021-06-08 Tue
메인화면, 로그인, 회원가입 구현  
Implements main_tweet, login, signup  

회원가입 유효성 검사는 추후로 미룸  
The validation part of the membershipt registration will be developed later  

node_modules를 zip파일로 업로드  
Upload node_modules by zip file  

## 2021-06-09 Wed
Login 오브젝트 안에 있었던 signup 기능들을 signup 오브젝트로 옮겨 분리시킴  
Move the signup functions that were inside the Login object to the signup object to separate them  

로그인에 성공 시 회원의 페이지로 이동하고 피드를 확인할 수 있음  
if login is successful, you can navigate to the members's page and view feeds

## 2021-06-10 Thu
회원 목록을 띄우고 로그인한 회원이 각각의 회원들을 팔로우/언팔로우 하는 것에 대한 조작  
Manipulation of member list and the member logging in following/unfollowing each member  

근데 구현에 문제가 생겨 다음 날로 계획을 미룸. 언팔로우 구현 시 post 전송 시에 값이 전달이 안됨.  
Deferring to the next day due to implementation problems. When I sending data using post, it isn't implemented.  

## 2021-06-11 Fri
Form에서 value를 values라고 적는 실수를 함. SQL에서 INSERT 구문에서는 VALUES를 사용해서 실수한듯.  
Miswrite value as values at form because of MySQL

팔로우/언팔로우, 팔로우한 사람에 따라서 피드 목록 보이기 구현. 피드 생성,수정,삭제 구현.  
Implementing follow/unfollow, CRUD feeds about followers  

남은 구현 사항: 피드에 대한 페이징, 회원가입 유효성 검사.
