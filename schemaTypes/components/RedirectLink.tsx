import {TextInputProps, useFormValue} from 'sanity'
import {Stack, Text} from '@sanity/ui'

export function RedirectLinkInput(props: TextInputProps) {
  const name = useFormValue(['title']) as string | undefined;
  console.log(props);
  

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {typeof props.value === 'string' && name ? (
        <Text size={1}>
          Omdirigeringslänken: https://funkit.at/{props.value.toLowerCase()}
        </Text>
      ) : null}
    </Stack>
  )
}