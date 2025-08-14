<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import Button from '~/components/ui/button/button.vue';
import Card from '~/components/ui/card/card.vue';
import CardTitle from '~/components/ui/card/cardTitle.vue';

const router = useRouter();

/**
 * handle Create 
 */
const handleCreate = () => {
  router.push(`/memberships/create`)
}

</script>
<template>
  <div class="p-5">
    <Card>


      <Button @click="handleCreate">
        <Plus />
        Create
      </Button>

    </Card>
  </div>
</template>