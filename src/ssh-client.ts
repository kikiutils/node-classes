import { createConsola } from 'consola';
import type { ConsolaInstance } from 'consola';
import { env, stderr, stdout } from 'node:process';
import { NodeSSH } from 'node-ssh';
import type { Config, SSHExecCommandOptions, SSHGetPutDirectoryOptions, SSHPutFilesOptions } from 'node-ssh';
import type { SFTPWrapper, TransferOptions } from 'ssh2';

import type { PathLike } from './path';

const loggerLevelStringToConsolaLogLevelMap = {
    debug: 4,
    error: 0,
    fatal: 0,
    info: 3,
    normal: 2,
    silent: -999,
    trace: 5,
    verbose: 999,
    warn: 1,
} as const;

export class SSHClient {
    readonly #connectConfig: Config;
    readonly #logger: ConsolaInstance;

    #nodeSSH: NodeSSH;

    constructor(host: string, username: string, password: string, port: number = 22, connectConfig?: Config) {
        this.#connectConfig = {
            ...connectConfig,
            host,
            password,
            port,
            username,
        };

        this.#logger = createConsola();
        this.#nodeSSH = new NodeSSH();
        if (env.NODE_ENV === 'production') this.setLoggerLevel('error');
    }

    get nodeSSH() {
        return this.#nodeSSH;
    }

    async connect() {
        try {
            this.#nodeSSH = await this.#nodeSSH.connect(this.#connectConfig);
            return true;
        } catch (error) {
            this.#logger.error(error);
            return false;
        }
    }

    disconnect() {
        try {
            this.#nodeSSH.dispose();
            return true;
        } catch (error) {
            this.#logger.error(error);
            return false;
        }
    }

    async execCommand(command: string, options?: SSHExecCommandOptions) {
        try {
            return await this.#nodeSSH.execCommand(command, options);
        } catch {}
    }

    async execCommandWithIO(command: string, options?: SSHExecCommandOptions) {
        return await this.execCommand(command, {
            ...options,
            onStderr: (data) => stderr.write(data.toString()),
            onStdout: (data) => stdout.write(data.toString()),
        });
    }

    getDir = this.getDirectory;

    async getDirectory(localDirectory: PathLike, remoteDirectory: PathLike, options?: SSHGetPutDirectoryOptions) {
        try {
            return await this.#nodeSSH.getDirectory(localDirectory.toString(), remoteDirectory.toString(), options);
        } catch (error) {
            this.#logger.error(error);
            return false;
        }
    }

    async getFile(localFile: PathLike, remoteFile: PathLike, givenSftp?: SFTPWrapper | null, transferOptions?: TransferOptions | null) {
        try {
            await this.#nodeSSH.getFile(localFile.toString(), remoteFile.toString(), givenSftp, transferOptions);
            return true;
        } catch (error) {
            this.#logger.error(error);
            return false;
        }
    }

    isConnected() {
        return this.#nodeSSH.isConnected();
    }

    async mkdir(path: PathLike) {
        try {
            await this.#nodeSSH.mkdir(path.toString());
            return true;
        } catch (error) {
            this.#logger.error(error);
            return false;
        }
    }

    putDir = this.putDirectory;

    async putDirectory(localDirectory: PathLike, remoteDirectory: PathLike, options?: SSHGetPutDirectoryOptions) {
        try {
            return await this.#nodeSSH.putDirectory(localDirectory.toString(), remoteDirectory.toString(), options);
        } catch (error) {
            this.#logger.error(error);
            return false;
        }
    }

    async putFile(localFile: PathLike, remoteFile: PathLike, givenSftp?: SFTPWrapper | null, transferOptions?: TransferOptions | null) {
        try {
            await this.#nodeSSH.putFile(localFile.toString(), remoteFile.toString(), givenSftp, transferOptions);
            return true;
        } catch (error) {
            this.#logger.error(error);
            return false;
        }
    }

    async putFiles(files: { local: PathLike; remote: PathLike }[], options?: SSHPutFilesOptions) {
        try {
            await this.#nodeSSH.putFiles(files.map(({ local, remote }) => ({ local: local.toString(), remote: remote.toString() }), options));
            return true;
        } catch (error) {
            this.#logger.error(error);
            return false;
        }
    }

    setLoggerLevel(level: keyof typeof loggerLevelStringToConsolaLogLevelMap) {
        this.#logger.level = loggerLevelStringToConsolaLogLevelMap[level];
    }
}

export default SSHClient;
