import type { _Object } from '@aws-sdk/client-s3'
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { IMAGE_HOST } from '~/constants'

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

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

  return Promise.all(allKeys.map(async (key) => `${IMAGE_HOST}/${key}`))
}
