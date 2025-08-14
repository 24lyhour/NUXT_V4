<script setup lang="ts">
import { UsersRound } from 'lucide-vue-next';
import Button from '~/components/ui/button/button.vue';
import Card from '~/components/ui/card/card.vue';


const router = useRouter();


/**
 * Show details user
 */
const handleShow = () => {
  router.push({ path: `/users/${uuid}` }) // removed trailing slash
}

</script>

<template>

  <div class="p-5">
    <Card class="p-5">
      <CardTitle primary-title>
        <div>
          <Button>

          </Button>
        </div>
      </CardTitle>
    </Card>
  </div>
</template>