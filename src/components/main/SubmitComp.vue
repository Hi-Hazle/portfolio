<template>
   <section class="submitForm mt300">
      <div class="inner">
         <article class="left">
            <p>Do You_ Like<br />My Vibe? _</p>
            <HeartObj />
         </article>
         <article class="right">
            <form action="" class="form">
               <div class="title">
                  <h3>
                     Business card<br />
                     Ticket
                  </h3>
               </div>
               <div class="form">
                  <div class="top">
                     <h3>Submit Form</h3>
                     <p>이메일과 성함을 알려주시면 제 명함을 보내드리겠습니다.<br />꼭 회사 이메일을 사용해주세요. 감사합니다.</p>
                  </div>
                  <ul>
                     <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" />
                     </li>
                     <li>
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" />
                     </li>
                     <li>
                        <label for="position">Position</label>
                        <input type="text" name="position" id="position" />
                     </li>
                  </ul>
               </div>
               <ul class="date">
                  <li>
                     <h4>Create Date</h4>
                     <p>
                        Wed Aug 21 1996 04:00:00<br />
                        GMT+0900 (한국 표준시)
                     </p>
                  </li>
                  <li>
                     <h4>Insert Date</h4>
                     <p>
                        Mon Jun 25 2023 09:00:00<br />
                        GMT+0900 (한국 표준시)
                     </p>
                  </li>
               </ul>
               <div class="btm">
                  <p>You are NOT Ready to..</p>
                  <p>You are Ready to..</p>
                  <button type="submit" disabled>SUBMIT!</button>
               </div>
            </form>
         </article>
      </div>
   </section>
</template>
<script>
import HeartObj from "components/main/HeartObj.vue"

export default {
   components: {
      HeartObj
   }
}
</script>
