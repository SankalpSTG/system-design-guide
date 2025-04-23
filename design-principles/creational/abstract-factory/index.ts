//Abstract Factory Pattern Implementation
interface StorageService{
  upload: (path: string, file: string) => void
}
class GoogleCloudStorageService implements StorageService{
  upload(path: string, file: string){
    console.log(`Storing file ${file} at path ${path} using Google Cloud`)
  }
}
class AWSStorageService implements StorageService{
  upload(path: string, file: string){
    console.log(`Uploading file ${file} at path ${path} using AWS`)
  }
}

interface JobsService{
  execute: (job: string) => void
}
class GoogleCloudJobsService implements JobsService{
  execute(job: string){
    console.log(`Executing job ${job} using Google Cloud`)
  }
}
class AWSJobsService implements JobsService{
  execute(job: string){
    console.log(`Executing job ${job} using AWS`)
  }
}


interface CacheService{
  set: (key: string, value: string) => void
}
class GoogleCloudCacheService implements CacheService{
  set(key: string, value: string){
    console.log(`Storing value ${value} at key ${key} in Cache using Google Cloud`)
  }
}
class AWSCacheService implements CacheService{
  set(key: string, value: string){
    console.log(`Storing value ${value} at key ${key} in Cache using AWS`)
  }
}

interface Cloud{
  getStorageService: () => StorageService
  getJobsService: () => JobsService
  getCacheService: () => CacheService
}

class GoogleCloud implements Cloud{
  getStorageService(){
    return new GoogleCloudStorageService()    
  }
  getJobsService(){
    return new GoogleCloudJobsService()    
  }
  getCacheService(){
    return new GoogleCloudCacheService()    
  }
}
class AWS implements Cloud{
  getStorageService(){
    return new AWSStorageService()    
  }
  getJobsService(){
    return new AWSJobsService()    
  }
  getCacheService(){
    return new AWSCacheService()    
  }
}

enum CloudServices {
  aws="aws",
  gcp="gcp"
}
class CloudFactory{
  static getCloud(type: string){
    switch(type){
      case CloudServices.aws:
        return new AWS()
      case CloudServices.gcp:
        return new GoogleCloud()
      default:
        throw Error("Invalid Cloud Service Type Provided")
    }
  }
}

// CloudFactory.getCloud(CloudServices.aws).getCacheService().set("first-name", "Joker")
// CloudFactory.getCloud(CloudServices.aws).getJobsService().execute("task-1")
// CloudFactory.getCloud(CloudServices.aws).getStorageService().upload("remote-path/some-filename.extension", "local-path/some-filename.extension")

// CloudFactory.getCloud(CloudServices.gcp).getCacheService().set("first-name", "Joker")
// CloudFactory.getCloud(CloudServices.gcp).getJobsService().execute("task-1")
// CloudFactory.getCloud(CloudServices.gcp).getStorageService().upload("remote-path/some-filename.extension", "local-path/some-filename.extension")