import type { _Object } from '@aws-sdk/client-s3'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { IMAGE_HOST } from '~/constants'
import { R2 } from '~/lib/r2'

export async function queryImageKeys() {
  const allKeys: string[] = []
  let isTruncated = true
  let continuationToken: string | undefined

  while (isTruncated) {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
      ContinuationToken: continuationToken,
    })
    const list = await R2.send(command)

    if (list.Contents) {
      const imageKeys = list.Contents.map((item: _Object) => item.Key!).filter((key) =>
        /\.(?:jpg|jpeg|png|gif|webp)$/i.test(key),
      )
      allKeys.push(...imageKeys)
    }

    isTruncated = !!list.IsTruncated
    continuationToken = list.NextContinuationToken
  }

  return allKeys.map((key) => ({
    key,
    url: `${IMAGE_HOST}/${key}`,
  }))
}
