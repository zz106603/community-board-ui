/* BoardDetail.js */
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Toast from 'react-bootstrap/Toast';
import Nav from 'react-bootstrap/Nav';
import instance from '../Axios/AxiosConfig';
import Form from 'react-bootstrap/Form';
import {format} from 'date-fns'

import DOMPurify from 'dompurify'; //HTML 태그와 속성 제거 XSS 공격 방지

const BoardDetail = () => {

    const [isRecommended, setIsRecommended] = useState(false);

    // const loginId = '';

    const [loginId, setLoginId] = useState('');
   
    const {postId} = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState([]);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const sanitizedContent = DOMPurify.sanitize(board.content); //텍스트 에디터 XSS 공격 방지

    //게시글 조회
    const getBoard = async (incrementViewCount) => {
      try{
        const resp = (await instance.get(`/api/posts/${postId}`, {
          params: {
            incrementViewCount: incrementViewCount,
          }
        })).data
        setBoard(resp)
        setLoading(false);
      }catch(error){
        console.log('API 호출 에러: ', error)
      }
    }
  
    //추천 UP
    const handleSubmitUp = async(event) => {
      event.preventDefault();
      
      const params = {
        postId : postId,
        userId: loginId,
        countFlag : 1
      }

      try{
        const response = await instance.post(`/api/posts/recom`, params, {
          headers: {
              'Content-Type': 'application/json'
          }
        });
        if(response){
          getBoard(false)
          checkRecommendation();
          alert('추천되었습니다.')
        }
        
      }catch(error){
        console.log('API 호출 에러: ', error)
      }
    }

    //추천 DOWN
    const handleSubmitDown = async(event) => {
      event.preventDefault();
      
      const params = {
        postId : postId,
        userId: loginId,
        countFlag : 0
      }

      try{
        const response = await instance.post(`/api/posts/recom`, params, {
          headers: {
              'Content-Type': 'application/json'
          }
        });
        if(response){
          getBoard(false)
          checkRecommendation();
          alert('추천이 취소되었습니다.')
        }
        
      }catch(error){
        console.log('API 호출 에러: ', error)
      }
    }
    
    //추천 여부 확인
    const checkRecommendation = async () => {
      try{
        const response = await instance.get(`/api/posts/recom/check`, {
          params: {
              userId: loginId,
              postId: postId
          }
        });

        // console.log(response.data)
        // if(response.data.status === 200){
        if(response.data){
          setIsRecommended(true);
        }else{
          setIsRecommended(false);
        }
      }catch(error){
        console.log('API 호출 에러: ', error)
      }
    };

    //댓글 조회
    const getComments = async () => {
      try{
        const resp = (await instance.get(`/api/posts/comment/${postId}`, {})).data
        setComments(resp)
        setLoading(false);
        // console.log(comments);
      }catch(error){
        console.log('API 호출 에러: ', error)
      }
    }

    //댓글 작성 이벤트
    const handleChange = (e) => {
      setComment(e.target.value);
    };

     //댓글 등록
     const handleSubmitComment = async (event) => {
      event.preventDefault();
      
      const formData = {
        userId: loginId,
        postId: postId,
        comment: comment
      };

      // console.log(formData)

      if (window.confirm('댓글을 등록하시겠습니까?')) {
          try {
              const response = await instance.post('/api/posts/comment/create', formData, {
                  headers: {
                  'Content-Type': 'application/json',
                  },
              });
      
              if (response.status === 200) { // HTTP 상태 코드가 200번대인 경우 요청이 성공했다고 가정합니다.
                  alert('등록이 완료되었습니다.')
                  // console.log('Form submitted successfully:', response.data);
                  getComments();
                  setComment('');
              } else {
                  alert('등록에 실패했습니다.')
                  console.error('Form submission failed:', response.statusText);
              }
          } catch (error) {
              alert('등록에 실패했습니다.')
              console.error('Error submitting form:', error);
          }
      }
      //window.location.href = `/board`
    };

    //댓글 삭제
    //삭제
    const handleDeleteComment = async (commentId) => {
      if (window.confirm('댓글을 삭제하시겠습니까?')) {
          try {
            await instance.delete(`/api/posts/comment/delete?commentId=${commentId}`);
              alert('삭제되었습니다.');
              getComments();
          } catch (error) {
              console.error('삭제 실패:', error);
              alert('삭제에 실패하였습니다.');
              // 실패했을 때 처리할 로직 추가
          }
        }
    };
  


    useEffect(()=>{

       // 비동기 요청을 수행하기 위해 별도 함수 정의
       const fetchUserInfo = async () => {
        try {
          const response = await instance.get('/api/user/info'); // 기본 설정이 적용된 instance 사용
  
          if (response.status === 200) {
            console.log(response.data);
            setLoginId(response.data.loginId); // response.data에서 필요한 정보를 설정
          }
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        }
      };
  
      fetchUserInfo();
      getBoard(true);
      getComments();
      checkRecommendation();
    }, []);

    // 수정 버튼을 보여줄지 여부를 결정하는 함수
    const canEdit = () => {
      return loginId === board.writer;
    };

    const formatDate = (date) => {
      return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
    };

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Toast style={{margin:"1%", width:"50%", marginLeft:"25%"}}>
            <Toast.Header closeButton={false}>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{board.title}</strong>
                <small>{board.writer}</small>
                <small style={{marginLeft:"1%"}}>({new Date(board.updateDate).toLocaleString()})</small>

                <small style={{marginLeft:"1%"}}>

                {isRecommended ? (
           <Form onSubmit={handleSubmitDown}>
           <Button type="submit" variant="primary">DOWN
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
  <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/>
</svg>
           </Button>
         </Form>
                ) : (
                  <Form onSubmit={handleSubmitUp}>
                  <Button disabled={isRecommended} type="submit" variant="primary">UP
                  <svg className='mb-1' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
<path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
</svg>
                  </Button>
                </Form>
                )}
               
                  </small>

                  <small style={{marginLeft:"1%"}}>조회{board.selectCount}</small>
                  <small style={{marginLeft:"1%"}}>추천{board.recomCount}</small>

            </Toast.Header>
            {/* <Toast.Body style={{height: "60vh", overflowY: "auto"}}>{board.content}</Toast.Body> */}
            {/* <Toast.Body style={{ height: "60vh", overflowY: "auto" }} dangerouslySetInnerHTML={{ __html: board.content }} /> */}
            <Toast.Body style={{ height: "60vh", overflowY: "auto" }} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

            <hr/>

            <div className='container text-center'>
                <div className="row justify-content-between mb-3">
                    {/* <div className="col-md-auto">
                      <Button variant="light">
                      <Nav.Link href="/board">뒤로가기</Nav.Link>
                      </Button>{' '}
                    </div> */}
                    <div className="col-md-auto">
                      {canEdit() && (  
                        <Button variant="primary">
                        <Nav.Link href={`/board/update/${postId}`}>수정</Nav.Link>
                        </Button>
                      )}
                    </div>
                </div>
            </div>

      <section id="comments-section" style={{marginTop:"0px"}}>
        <div id="comments-container">
            <table className="table">
                <thead style={{borderBottom:"3px solid gray"}}>
                <tr>
                  <th style={{width:"10%"}}>전체 댓글 {comments.length}개</th>
                </tr>
                </thead>
                <div style={{maxHeight: "300px", overflowY: "auto"}}>
                <tbody style={{borderBottom: "3px solid gray"}}>
                  {comments.map((comment, index) => (
                    <tr key={index} style={{borderBottom: "1px solid black"}}>
                      <td style={{width: "10%", fontSize: "0.8rem", paddingLeft:"10px"}}>{comment.userId}</td>
                      <td style={{width: "40%"}}>{comment.comment}</td>
                      <td style={{width: "10%", fontSize: "0.8rem"}}>{formatDate(comment.commentDate)}</td>
                      <td style={{ width: "5%" }}>
                        {loginId === comment.userId && (
                          <Button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment.id)}>X</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                </div>
            </table>
        </div>
        <div className="m-2">
          <Form onSubmit={handleSubmitComment} id="comment-form">
              <div className="form-group">
                  <div className="d-flex">
                      <textarea 
                        className="form-control mr-2" 
                        id="comment" 
                        rows="2" 
                        value={comment}
                        onChange={handleChange}>
                      </textarea>
                      <button type="submit" style={{width:"100px", height:"9vh"}} className="btn btn-primary align-self-start" id="create-comment-btn"><small>등록</small></button>
                  </div>
              </div>
          </Form>
        </div>
      </section>
    </Toast>


      )}


    </div>
  );
};

export default BoardDetail;
