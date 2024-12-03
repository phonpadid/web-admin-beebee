<script setup lang="ts">
import { UsergroupAddOutlined, RiseOutlined } from '@ant-design/icons-vue';
import { cardsData } from './card-data';
// Define a dataset for reusability and scalability

</script>

<template>
  <div class="h-auto">
    <div class="box-total-data grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(card, index) in cardsData"
        :key="index"
        class="w-full ring-1 ring-slate-200 rounded-md shadow-md bg-white p-4"
      >
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-md font-semibold text-gray-700">{{ card.title }}</h3>
            <p class="text-md font-bold text-gray-900">{{ card.count }}</p>
          </div>
          <div
            class="flex items-center justify-center w-16 h-16 rounded-xl"
            :class="card.bgColor"
          >
            <UsergroupAddOutlined :class="`text-xl ${card.iconColor}`" />
          </div>
        </div>
        <div class="flex items-center gap-2 text-blue-500 mt-2">
          <RiseOutlined class="text-xl" />
          <p class="font-semibold">{{ card.percentage }}</p>
          <p class="text-slate-500 text-sm">Update latest</p>
        </div>
      </div>
    </div>
    <div class="contant mt-2 h-[14rem] p-2 bg-slate-200">
        <h1>Detail</h1>
        <p class="text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum nam repudiandae quos iste nostrum perspiciatis maiores, unde fuga cumque labore non porro doloribus. Porro nesciunt numquam rerum sequi reprehenderit sint eaque, tempora aut eligendi voluptate, sit sunt dignissimos est, voluptas aliquid. Ex soluta enim sit ab explicabo, praesentium dolores culpa impedit recusandae voluptate ullam excepturi sequi quaerat labore quis numquam earum eligendi ipsum laborum quasi asperiores. Quae dolorum animi ratione qui, ea quibusdam tempore modi maxime nihil enim! Aspernatur, at nesciunt itaque dolorem ad illo ducimus id amet culpa hic tempora laboriosam ipsum sequi nemo odit, ratione quasi assumenda distinctio ut in quam? Dicta qui id sit aliquid, praesentium ipsam. Tempora iste voluptates in voluptate eaque assumenda, deserunt, a nihil dolores dolorum asperiores excepturi quae libero delectus accusantium suscipit aspernatur reiciendis. Distinctio ipsa inventore officiis esse quis laboriosam ratione, obcaecati repudiandae! Mollitia sunt ab architecto eum alias ullam itaque unde numquam dolor, ut temporibus est corrupti a quod, totam provident id quasi corporis. A dolorum sequi error eveniet laudantium at cumque optio beatae quos modi maxime ipsum ducimus, facilis iure quidem iusto corporis ut ad laborum, nesciunt, quibusdam id accusantium voluptates? Expedita nulla quod accusamus ratione eaque! Quaerat velit illo architecto hic quod similique ratione laboriosam debitis labore magni praesentium aperiam quae recusandae minima assumenda libero, dolore, iste sed quas? Beatae, officia.  </p>
    </div>
  </div>
</template>
