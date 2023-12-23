<Table
                  radius="none"
                  shadow="none"
                  classNames={{
                    th: "bg-black text-white text-md py-3",
                  }}
                  bottomContent={bottomContent}
                  bottomContentPlacement="outside"
                >
                  <TableHeader>
                    <TableColumn>GL Account</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn>Amount</TableColumn>
                    <TableColumn>Cost / Project ID</TableColumn>
                    <TableColumn>Action</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {formNoi.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <SelectComponent
                            // isInvalid={error ? true : false}
                            // errorMessage={
                            //   error && validation.budget
                            //     ? validation.budget
                            //     : ""
                            // }
                            radius="sm"
                            isRequiredLabel={false}
                            variant="bordered"
                            onChange={(event: any) => {}}
                            isRequired
                            classNames={{
                              trigger:
                                "border-1 border-gray-400 h-[40px] w-[10rem]",
                              value: "text-default-700",
                            }}
                          >
                            {optGlAcc.map((item: GLAccTypes) => (
                              <SelectItem
                                key={item.gl_acc_id}
                                value={item.gl_acc_id}
                              >
                                {item.gl_account}
                              </SelectItem>
                            ))}
                          </SelectComponent>
                          {/* <Input
                            size="sm"
                            variant="bordered"
                            value={item.glAccount}
                            onChange={(event: any) => {
                              const newFormNoi = [...formNoi];
                              newFormNoi[index].glAccount = event.target.value;
                              setFormNoi(newFormNoi);
                            }}
                            classNames={{
                              inputWrapper:
                                "border-1 border-gray-400 h-[40px] w-[18rem] lg:w-full",
                            }}
                          /> */}
                        </TableCell>
                        <TableCell className="w-[15rem] lg:w-[20rem]">
                          <TextArea
                            size="sm"
                            variant="bordered"
                            value={item.desc}
                            onChange={(event: any) => {
                              const newFormNoi = [...formNoi];
                              newFormNoi[index].desc = event.target.value;
                              setFormNoi(newFormNoi);
                            }}
                            classNames={{
                              inputWrapper:
                                "border-1 border-gray-400 w-[15rem] lg:w-[20rem]",
                              input: "w-[100%] resize-y min-h-[40px]",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            size="sm"
                            variant="underlined"
                            value={formatWithoutRupiah(item.amount)}
                            onChange={(event: any) => {
                              handleAmountChange(index, event.target.value);
                            }}
                            classNames={{
                              inputWrapper: "h-[40px] w-[12rem] lg:w-full",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            size="sm"
                            variant="bordered"
                            value={item.costOrProjectID}
                            onChange={(event: any) => {
                              const newFormNoi = [...formNoi];
                              newFormNoi[index].costOrProjectID =
                                event.target.value;
                              setFormNoi(newFormNoi);
                            }}
                            classNames={{
                              inputWrapper:
                                "border-1 border-gray-400 h-[40px] w-[15rem] lg:w-full",
                              input: "text-end",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex lg:flex-row gap-2 justify-center">
                            {/* {formNoi.length > 1 && ( */}
                            <Button
                              size="md"
                              variant="bordered"
                              color="danger"
                              isIconOnly
                              onClick={() => handleDeleteInput(index)}
                              className="bg-transparent border-1 border-red-500 p-2 ml-2 hover:bg-red-100 "
                            >
                              <Closed className="fill-red-500" />
                            </Button>
                            {/* )} */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>