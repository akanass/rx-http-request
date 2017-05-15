// import libraries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import * as fs from 'fs-extra';

/**
 * Interface for file object definition
 */
interface FileObject {
    name: string;
    remove?: boolean;
    externals?: boolean;
}

/**
 * Class declaration
 */
class Packaging {
    // private property to store files list
    private _files: FileObject[];
    // private property to store src path
    private _srcPath: string;
    // private property to store dest path
    private _destPath: string;

    /**
     * Class constructor
     *
     * @param files {FileObject[]} name of each files to package and flag to know if we need to delete it after
     * @param src {string} src base path from current process
     * @param dest {string} dest base path from current process
     */
    constructor(files: FileObject[], src: string = '', dest: string = '/dist') {
        this._files = files;
        this._srcPath = `${process.cwd()}${src}/`;
        this._destPath = `${process.cwd()}${dest}/`;
    }

    /**
     * Function to copy one file
     *
     * @param file {string}
     * @param externals {boolean}
     *
     * @return {Observable<R>}
     */
    private _copy(file: string, externals?: boolean): Observable<any> {
        // copy package.json
        if (file.indexOf('package.json') !== -1) {
            return this._copyAndCleanupPackageJson(file);
        }

        // copy other files
        return <Observable<any>> Observable.create((observer) => {
            let fileDest = file;
            if (externals && file.indexOf('src/') !== -1) {
                fileDest = file.split('src/').pop();
            }
            fs.stat(`${this._srcPath}${file}`, (error, stats) => {
                if (error) {
                    console.error('doesn\'t exist on copy =>', error.message);
                }
                if (stats && (stats.isFile() || stats.isDirectory())) {
                    fs.copy(`${this._srcPath}${file}`, `${this._destPath}${fileDest}`, (err) => {
                        if (err) {
                            console.error('copy failed =>', err.message);
                        }

                        observer.next();
                        observer.complete();
                    });
                } else {
                    observer.next();
                    observer.complete();
                }
            });
        });
    }

    /**
     * Function to remove original file
     *
     * @param file {string}
     * @param remove {boolean}
     *
     * @return {Observable<any>}
     *
     * @private
     */
    private _remove(file: string, remove?: boolean): Observable<any> {
        // remove original files
        return <Observable<any>> Observable.create((observer) => {
            if (remove) {
                fs.stat(`${this._srcPath}${file}`, (error, stats) => {
                    if (error) {
                        console.error('doesn\'t exist on remove =>', error.message);
                    }

                    if (stats && (stats.isFile() || stats.isDirectory())) {
                        fs.remove(`${this._srcPath}${file}`, (err) => {
                            if (err) {
                                console.error('remove failed =>', err.message);
                            }

                            observer.next();
                            observer.complete();
                        });
                    } else {
                        observer.next();
                        observer.complete();
                    }
                });
            } else {
                observer.next();
                observer.complete();
            }
        });
    }

    /**
     * Function to cleanup package.json and _copy it to dist directory
     *
     * @param file {string}
     *
     * @return {Observable<R>}
     *
     * @private
     */
    private _copyAndCleanupPackageJson(file: string): Observable<any> {
        // function to read JSON
        const readJson = (src: string): Observable<any> => {
            return <Observable<any>> Observable.create((observer) => {
                fs.readJson(src, (error, packageObj) => {
                    if (error) {
                        return observer.error(error);
                    }

                    observer.next(packageObj);
                    observer.complete();
                });
            });
        };

        // function to write JSON
        const writeJson = (dest: string, data: any): Observable<any> => {
            return <Observable<any>> Observable.create((observer) => {
                fs.outputJson(dest, data, (error) => {
                    if (error) {
                        return observer.error(error);
                    }

                    observer.next();
                    observer.complete();
                });
            });
        };

        // read package.json
        return readJson(`${this._srcPath}${file}`).flatMap(packageObj => {
            // delete obsolete data in package.json
            delete packageObj.scripts;
            delete packageObj.devDependencies;

            // write new package.json
            return writeJson(`${this._destPath}${file}`, packageObj);
        });
    }

    /**
     * Function that _copy all files in dist directory
     */
    process() {
        Observable.forkJoin(this._files.map((fileObject: FileObject) => this._copy(fileObject.name, fileObject.externals)
            .flatMap(_ => this._remove(fileObject.name, fileObject.remove)))).subscribe(null, error => console.error(error));
    }
}

// process packaging
new Packaging(require('./files')).process();
