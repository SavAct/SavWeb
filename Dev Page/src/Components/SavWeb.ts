import { GetTableRowsResult } from "eosjs/dist/eosjs-rpc-interfaces";
import { RpcError } from "eosjs";

export interface RouteLocation {
  fullPath: string;
  path: string;
  query: { [k: string]: string | null | Array<string | null> };
  hash: string;
}

export interface PageIni extends RouteLocation {
  f: "ini";
  link: string;
  idToken: string;
  darkstyle: boolean;
}

export interface VerifyIdResult {
  f: "verifyIdResult";
  verified: boolean;
}

export interface PaymentResult {
  f: "payResult";
  id: string;
  result: boolean;
}

export interface GetFileResult {
  f: "getFileResult";
  id: string;
  file: File;
}

export interface EosioChainApiResult {
  f: "eosioChainApiResult";
  id: string;
  post: "get_account" | "get_table_rows" | "get_currency_balance"; // like "get_table_rows", see https://developers.eos.io/manuals/eos/v2.0/nodeos/plugins/chain_api_plugin/api-reference/index
  result: unknown;
}

export interface BrowserAction {
  SavWeb: PageIni | GetFileResult | VerifyIdResult | EosioChainApiResult;
}

export interface GoTo {
  f: "go";
  to: string; // URL of a file on blockchain
  target?: "_blank" | "_self";
}

export interface GetFile {
  f: "getFile";
  id: string;
  get: string; // Link to a file
  idToken: string;
}

interface GetFile_idNull extends Omit<GetFile, "id"> {
  id: string | null;
}

export interface SavActPayment {
  time:
    | number
    | {
        // seconds since epoch (from midnight of January 1, 1970). Attention seconds are needed, date.getTime is in milli seconds
        min?: number;
        max?: number;
      };
}

export interface PayParams {
  chain: string; // Chain id or chain short name
  from?: string;
  to: string;
  pay: string; // Asset like "1.2300 EOS eosio.token"
  memo?: string;
  t?: string | number; // Absolut time stamp of the deadline in seconds
  dt?: string | number; // Relative time until the deadline in seconds
}

export interface Payment extends PayParams {
  f: "pay";
  id: string;
  idToken: string;
}

interface Payment_idNull extends Omit<Payment, "id"> {
  id: string | null;
}

export interface EosioChainApi {
  f: "eosioChainApi" | null;
  id: string;
  chain: string; // Chain id or chain short name
  post: "get_account" | "get_table_rows" | "get_currency_balance"; // like "get_table_rows", see https://developers.eos.io/manuals/eos/v2.0/nodeos/plugins/chain_api_plugin/api-reference/index
  params: unknown;
  idToken: string;
}

interface EosioChainApi_idNull extends Omit<EosioChainApi, "id"> {
  id: string | null;
}

export interface Transaction {
  f: "trx";
  id: string;
  chain: string;
  data: unknown;
  idToken: string;
}

interface Transaction_idNull extends Omit<Transaction, "id"> {
  id: string | null;
}

export interface VerifiyId {
  f: "verifyId";
  idToken: string;
  alt?: string; // if idToken is not equal, then goto alt otherwise load the last requested html file
  recVersion?: number; // recommended version of the browser
}

export interface SetLocation {
  f: "setLocation";
  idToken: string;
  fullPath?: string;
  path?: string;
  query?: Query;
  hash?: string;
}

export type Query = { [k: string]: string | null | Array<string | null> };

export interface PageAction {
  SavWeb:
    | VerifiyId
    | GoTo
    | Payment
    | Transaction
    | GetFile
    | EosioChainApi
    | SetLocation;
}

interface PageAction_idNull {
  SavWeb:
    | VerifiyId
    | GoTo
    | Payment_idNull
    | Transaction_idNull
    | GetFile_idNull
    | EosioChainApi_idNull;
}

export interface FullRpcError extends RpcError {
  json: {
    code: number;
    error: {
      code: number;
      details: Array<{
        file: string;
        line_number: number;
        message: string;
        method: string;
      }>;
    };
    message: string;
  };
}

export class SavWeb {
  idToken = "";
  requestResult: { [key: string]: unknown | null | undefined } = {};
  requestNumber = 0;
  connected: boolean = false;

  constructor(
    private onIni: (msg: PageIni) => void,
    public gotoPageError = "https://savact.app/#/_404_",
    public onMessageEvent?: (msg: any) => void
  ) {
    // It must be executed before the browser assigns the idToken.
    this.connect();
  }

  resolveEvent(event: any) {
    this.validatePostMessage(event);

    if (typeof this.onMessageEvent == "function") {
      this.onMessageEvent(event);
    }
  }
  connect() {
    if (!this.connected) {
      window.addEventListener(
        "message",
        (event) => {
          this.resolveEvent(event);
        },
        false
      );
    }
    this.connected = true;
  }
  disconnect() {
    window.removeEventListener("message", (event) => {
      this.resolveEvent(event);
    });
    this.connected = false;
  }

  /**
   * @param event The event of a post message
   */
  validatePostMessage(event: MessageEvent<any>) {
    if (event == undefined || event.data == undefined) {
      return;
    }
    if (event.data) {
      const data = event.data; // as {SavWeb: {idToken?: string, validToken?: boolean, f: string, post?: string, result?: unknown}}
      if (data.SavWeb) {
        const parentMsg = data.SavWeb;
        if (parentMsg.idToken != undefined && parentMsg.idToken != "") {
          this.idToken = parentMsg.idToken;
          console.log("SavWeb page got idToken", this.idToken);
        }
        if (typeof parentMsg.validToken == "boolean") {
          if (!parentMsg.validToken) {
            window.parent.postMessage(
              { SavWeb: { go: this.gotoPageError } },
              "*"
            );
          }
        }
        switch (parentMsg.f) {
          case "eosioChainApiResult":
            switch (parentMsg.post) {
              case "get_account":
                // console.log('Result in SavWeb page:', parentMsg.result);
                const result = parentMsg.result;
                if (result == undefined) {
                  // Set to undefined
                  this.requestResult[parentMsg.id] = undefined;
                } else {
                  if (
                    "account_name" in result &&
                    result.account_name != undefined
                  ) {
                    this.requestResult[parentMsg.id] = true;
                  } else {
                    this.requestResult[parentMsg.id] = false;
                  }
                }
                break;
              default: // 'get_table_rows'
                // console.log('Result in SavWeb page:', parentMsg.result);
                const resultTable = parentMsg.result;
                if (resultTable == undefined) {
                  // Set to undefined for no result
                  this.requestResult[parentMsg.id] = undefined;
                } else {
                  this.requestResult[parentMsg.id] = resultTable;
                }
                break;
            }
            break;
          case "ini":
            if (typeof this.onIni == "function") {
              // console.log('is function');
              this.onIni(parentMsg);
            }
            break;
        }
      }
    }
  }

  /**
   * Sleep for a defined amount of time
   * @param ms Milliseconds to sleep
   */
  static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Check a name if it exists
   * @param name EOSIO account name
   * @param maxWaitMs Maximum of milliseconds to wait
   * @returns true if the name exists, false if it does not exist and undefined on errors
   */
  async checkName(chain: string, name: string, maxWaitMs: number = 10000) {
    // Send request
    const result = (await this.request(
      {
        SavWeb: {
          f: "eosioChainApi",
          id: null,
          chain,
          post: "get_account",
          params: name,
          idToken: this.idToken,
        },
      },
      maxWaitMs
    )) as true | false | undefined | FullRpcError;

    return result;
  }

  async request(message: PageAction_idNull, maxWaitMs = 10000) {
    const requestId = this.requestNumber++; // Get new request id

    // Set request id if defined
    if (
      "SavWeb" in message &&
      "id" in message.SavWeb &&
      message.SavWeb.id == null
    ) {
      message.SavWeb.id = requestId.toString();
    }

    // Send request
    window.parent.postMessage(message, "*");
    this.requestResult[requestId] = null;

    // Wait for the result but only as long as defined by wait
    let timespan = 0;
    const interval = 100; // Check each 100 ms
    while (
      timespan < maxWaitMs &&
      requestId in this.requestResult &&
      this.requestResult[requestId] === null
    ) {
      await SavWeb.sleep(interval);
      timespan += interval;
    }

    // Return the result
    if (
      requestId in this.requestResult &&
      this.requestResult[requestId] !== null
    ) {
      const r = this.requestResult[requestId];
      this.requestResult[requestId] = undefined; // Clear the item
      return r;
    }

    // Clear the item
    this.requestResult[requestId] = undefined;
    return undefined;
  }

  /** Get the rows of a table
   * @param chain Chain Id or short name
   * @param contract Contract account
   * @param table Table name
   * @param scope Scope name
   * @param entry Is a single number or an array. As array the first index descipe the lower_bound and the second the upper_bound
   * @param maxWaitMs Maximum amount of time to wait until the request should be handled
   * @returns A single row if there is only one requested and an array of rows if there is an interval requested
   */
  async getTableRows(
    chain: string,
    contract: string,
    table: string,
    scope: string,
    entry: number | string | Array<number | string>,
    maxWaitMs = 10000
  ) {
    let lower_bound;
    let upper_bound;
    if (typeof entry == "object") {
      lower_bound = entry[0].toString();
      upper_bound = entry[1].toString();
    } else {
      lower_bound = entry.toString();
      upper_bound = lower_bound;
    }

    // Send request
    const result = (await this.request(
      {
        SavWeb: {
          f: "eosioChainApi",
          id: null, // With value null this parameter will be defined in request id
          chain,
          post: "get_table_rows",
          params: {
            code: contract,
            table,
            scope,
            lower_bound,
            upper_bound,
          },
          idToken: this.idToken,
        },
      },
      maxWaitMs
    )) as GetTableRowsResult | FullRpcError | undefined;

    if (result == undefined) {
      console.error("Cannot get the table from", contract);
      return undefined;
    }

    // Return the result
    if ("rows" in result) {
      const rows = result.rows;
      if (rows.length > 0) {
        return typeof entry == "object" ? rows : rows[0];
      } else {
        return null;
      }
    }
    return undefined;
  }

  async getBalance(
    chain: string,
    contract: string,
    account: string,
    symbol: string,
    maxWaitMs: number = 10000
  ) {
    // Send request
    const result = (await this.request(
      {
        SavWeb: {
          f: "eosioChainApi",
          id: null, // With value null this parameter will be defined in request id
          chain,
          post: "get_currency_balance",
          params: {
            code: contract,
            account,
            symbol,
          },
          idToken: this.idToken,
        },
      },
      maxWaitMs
    )) as string[] | FullRpcError | undefined;

    // console.log('result on page', result);

    if (typeof result == "object") {
      if ("error" in result) {
        return undefined;
      }
      return result;
    }

    return undefined;
  }

  static goTo(link: string) {
    window.parent.postMessage(
      {
        SavWeb: {
          f: "go",
          to: link,
        },
      },
      "*"
    );
  }

  /**
   * Verifiy the given idToken
   */
  verifiy() {
    window.parent.postMessage(
      {
        SavWeb: {
          f: "verifiyId",
          idToken: this.idToken,
        },
      },
      "*"
    );
  }

  /**
   * Send a payment request
   * @param chain Blockchain of the payment
   * @param to Recipient
   * @param pay Asset as string
   * @param memo Memo as string
   * @param from Optional sender
   */
  payment(
    chain: string,
    to: string,
    pay: string,
    memo: string,
    from: string | undefined = undefined
  ) {
    this.requestNumber++;
    console.log("Send via chain", chain);
    window.parent.postMessage(
      {
        SavWeb: {
          f: "pay",
          id: this.requestNumber,
          idToken: this.idToken,
          chain,
          to,
          from,
          pay,
          memo,
        },
      },
      "*"
    );
  }
}
