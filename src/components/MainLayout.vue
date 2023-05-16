<template>
  <w-flex justify-center class="lh5">
    <w-form class="xs12 pa1 mt12" style="border: 1px solid darkblue; border-radius: 5px; height: 25%;">
      <w-input class="mt5" label="Заголовок статьи" :validators="[validators.required]"
        style="font-size: 16px;"></w-input>

      <w-textarea class="mt5" label="Текст статьи" :validators="[validators.required]"
        style="font-size: 16px;">
      </w-textarea>

      <w-flex justify-center>
        <w-button xl class="mt5" type="submit" style="font-size: 24px;">Добавить запись</w-button>
      </w-flex>
    </w-form>
  </w-flex>
</template>

<script>
export default {

  data: () => ({
    validators: {
      required: value => !!value || 'Поле должно быть заполнено'
    }
  })
}
</script>

<style scoped></style>