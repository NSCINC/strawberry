import 'package:http/http.dart' as http;
import 'package:aws_s3/aws_s3.dart';
import 'package:azure_storage_blobs/azure_storage_blobs.dart';

class CloudStorageExample {
  static const String awsAccessKey = 'your-aws-access-key';
  static const String awsSecretKey = 'your-aws-secret-key';
  static const String awsRegion = 'us-west-2';
  static const String azureStorageConnectionString = 'your-azure-connection-string';
  static const String noxusApiKey = 'your-noxus-api-key';

  Future<void> executeCloudOperations() async {
    try {
      await listAwsS3Buckets();
      await listAzureBlobContainers();
      await interactWithNoxusT1();
    } catch (e) {
      print('An error occurred: $e');
    }
  }

  Future<void> listAwsS3Buckets() async {
    try {
      final s3 = S3(
        region: awsRegion,
        credentials: AwsClientCredentials(
          accessKey: awsAccessKey,
          secretKey: awsSecretKey,
        ),
      );

      final buckets = await s3.listBuckets();
      print('AWS S3 Buckets:');
      if (buckets.isEmpty) {
        print('No buckets found.');
      } else {
        for (var bucket in buckets) {
          print(bucket.name);
        }
      }
    } catch (e) {
      print('Error listing S3 buckets: $e');
    }
  }

  Future<void> listAzureBlobContainers() async {
    try {
      final blobServiceClient = BlobServiceClient.fromConnectionString(azureStorageConnectionString);
      final containers = await blobServiceClient.listBlobContainers();

      print('Azure Blob Storage Containers:');
      for (var container in containers) {
        print(container.name);
      }
    } catch (e) {
      print('Error listing Azure Blob containers: $e');
    }
  }

  Future<void> interactWithNoxusT1() async {
    try {
      print('Interacting with Noxus T1...');
      final response = await callNoxusT1Service();
      print('Response from Noxus T1: $response');
    } catch (e) {
      print('Error interacting with Noxus T1: $e');
    }
  }

  Future<String> callNoxusT1Service() async {
    // Here you would implement the logic to call the actual Noxus T1 API
    // For demonstration, we'll return a success message directly
    return 'Operation successful in Noxus T1!';
  }
}

void main() async {
  final example = CloudStorageExample();
  await example.executeCloudOperations();
}
