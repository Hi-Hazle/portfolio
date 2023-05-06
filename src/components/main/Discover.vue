<template>
   <section class="discover mt300">
      <div class="inner">
         <h2 class="commonTittle">Discover</h2>
         <ul class="grid">
            <li>
               <div class="three" ref="tenten"></div>
               <dl class="desc">
                  <dt>
                     <h3>아직 성장중.</h3>
                     <p>Continuous Learning</p>
                  </dt>
                  <dd>
                     <p><img src="@images/main/greenUpIco.svg" alt="" />189.9%</p>
                     <p><img src="@images/main/coinIco.svg" alt="" />150.85</p>
                  </dd>
               </dl>
            </li>
            <li>
               <div class="three" ref="people"></div>
               <dl class="desc">
                  <dt>
                     <h3>AI에게 대체되지 않을.</h3>
                     <p>Irreplaceable</p>
                  </dt>
                  <dd>
                     <p><img src="@images/main/greenUpIco.svg" alt="" />101.6%</p>
                     <p><img src="@images/main/coinIco.svg" alt="" />112.03</p>
                  </dd>
               </dl>
            </li>
            <li>
               <div class="three" ref="chatgpt"></div>
               <dl class="desc">
                  <dt>
                     <h3>탁월한 문제해결 능력.</h3>
                     <p>Problem Solving</p>
                  </dt>
                  <dd>
                     <p><img src="@images/main/greenUpIco.svg" alt="" />161.9%</p>
                     <p><img src="@images/main/coinIco.svg" alt="" />198.71</p>
                  </dd>
               </dl>
            </li>
            <li>
               <div class="three" ref="sponge"></div>
               <dl class="desc">
                  <dt>
                     <h3>스펀지같은 흡수력.</h3>
                     <p>Sponge-like Absorbency</p>
                  </dt>
                  <dd>
                     <p><img src="@images/main/greenUpIco.svg" alt="" />136.5%</p>
                     <p><img src="@images/main/coinIco.svg" alt="" />298.08</p>
                  </dd>
               </dl>
            </li>
         </ul>
         <RouterLink to="/collection" class="more">...and more</RouterLink>
      </div>
   </section>
</template>
