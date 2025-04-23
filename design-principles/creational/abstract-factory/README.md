# Abstract Factory Pattern

Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.

We are implementing two cloud services in Typescript
1. Google Cloud
2. AWS

Both of these clouds have three services that we will be using
1. Storage Service
2. Jobs Service
3. Cache Service

To hide the complexities, we have skipped the configurations. You can read about it in Factory Pattern Implementation.

We have created Factory Class for each of the cloud service derived from the Cloud interface. It has get functions to instantiate each of the storage, jobs and cache services.
```typescript
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
```

Now we create an abstract factory class to instantiate any of the factories. The class has a static getCloud function which accepts the type of cloud service as a parameter and returns the appropriate cloud service.

```typescript
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
```
The entire code can be found in the ```index.ts``` file in the current folder.